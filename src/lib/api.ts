import {
  RankingApiResponse,
  SummonerDetailApiResponse,
  TFTRankTier,
  DeckListResponse,
  MetaDeckListResponse,
  PatchNoteListResponse,
  PatchNoteDetailResponse,
  DeckDetailResponse,
  ChampionListResponse,
  TFTItemResponse,
  TFTItem,
} from '@/types/api';

type Top3User = {
  rank: number;
  name: string;
  tag: string;
  profileImg: string;
};

// Retry utility function for API calls
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt) {
        throw error;
      }

      // Log retry attempt
      console.warn(
        `Fetch attempt ${i + 1} failed, retrying in ${delay}ms...`,
        error,
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Increase delay for next retry (exponential backoff)
      delay *= 2;
    }
  }

  throw new Error('Fetch failed after all retries');
}

export async function fetchRankedTftRankingInfo(
  from: number,
  limit: number,
  needTotalCount: boolean,
  tier: string,
): Promise<RankingApiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/ranking?from=${from}&limit=${limit}&needTotalCount=${needTotalCount ? 'y' : 'n'}&queue=RANKED_TFT&tier=${tier}`,
  );
  return res.json();
}

async function fetchTop3DetailUserInfo(
  top3UserList: { name: string; tag: string }[],
) {
  const top3User: Top3User[] = [];
  for (const user of top3UserList) {
    const { name, tag } = user;
    const userDetail: SummonerDetailApiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/detail/${name}/${tag}`,
    ).then((res) => res.json());
    top3User.push({
      rank: top3User.length + 1,
      name,
      tag,
      profileImg: userDetail.data.summoner?.profileIconUrl,
    });
  }
  return top3User;
}

export async function fetchRankedTftTop3User() {
  const data = await fetchRankedTftRankingInfo(
    0,
    3,
    false,
    TFTRankTier.CHALLENGER.toString().toUpperCase(),
  );

  const top3UserList = data.data.list.slice(0, 3).map((user) => ({
    name: user.name,
    tag: user.tag,
  }));

  return await fetchTop3DetailUserInfo(top3UserList);
}

export async function fetchRankedTftTop3UserForTier(
  tier: TFTRankTier | string,
) {
  const data = await fetchRankedTftRankingInfo(
    0,
    3,
    false,
    tier.toString().toUpperCase(),
  );

  const top3UserList = data.data.list.slice(0, 3).map((user) => ({
    name: user.name,
    tag: user.tag,
  }));

  return await fetchTop3DetailUserInfo(top3UserList);
}

export async function fetchTodayPickDecks(): Promise<DeckListResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks/today-picks`,
  );
  return res.json();
}

export async function fetchMetaDecks(params?: {
  tier?: string;
  setVersion?: number;
  activate?: boolean;
}): Promise<MetaDeckListResponse> {
  return fetchWithRetry(async () => {
    const queryParams = new URLSearchParams();
    if (params?.tier) queryParams.append('tier', params.tier);
    if (params?.setVersion)
      queryParams.append('setVersion', params.setVersion.toString());
    if (params?.activate !== undefined)
      queryParams.append('activate', params.activate.toString());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks?${queryParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch meta decks: ${res.status}`);
    }

    return res.json();
  }, 5);
}

export async function fetchPatchNotes(params?: {
  active?: boolean;
}): Promise<PatchNoteListResponse> {
  const queryParams = new URLSearchParams();
  if (params?.active !== undefined) {
    queryParams.append('active', params.active ? 'y' : 'n');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/patchnote?${queryParams.toString()}`,
  );
  return res.json();
}

export async function fetchPatchNoteDetail(
  id: string,
): Promise<PatchNoteDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/patchnote/${id}`,
  );
  return res.json();
}

export async function fetchDeckDetail(
  deckId: string,
): Promise<DeckDetailResponse> {
  return fetchWithRetry(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks/${deckId}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch deck detail: ${res.status}`);
    }

    return res.json();
  }, 5);
}

export async function fetchChampionsFromBackend() {
  return fetchWithRetry(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch champions: ${res.status}`);
    }

    const champions: ChampionListResponse[] = await res.json();

    // Transform to match Supabase champion structure
    return champions.map((champion) => ({
      id: champion.id,
      name: champion.name,
      cost: champion.cost,
      image: champion.images.square,
      traits: champion.traits,
    }));
  }, 5); // Retry up to 5 times for build stability
}

export async function fetchItemsFromBackend() {
  return fetchWithRetry(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/items`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch items: ${res.status}`);
    }

    const response: TFTItemResponse = await res.json();
    const items = response.data;

    // Transform to match Supabase item structure
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.icon,
      effects: JSON.stringify(item.effects),
      type: item.tags[0] || '',
    }));
  }, 5); // Retry up to 5 times for build stability
}
