import {
  RankingApiResponse,
  SummonerDetailApiResponse,
  TFTRankTier,
} from '@/types/api';

type Top3User = {
  rank: number;
  name: string;
  tag: string;
  profileImg: string;
};

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
  console.log(top3UserList);
  for (const user of top3UserList) {
    const { name, tag } = user;
    const userDetail: SummonerDetailApiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/detail/${name}/${tag}`,
    ).then((res) => res.json());
    console.log(userDetail);
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
