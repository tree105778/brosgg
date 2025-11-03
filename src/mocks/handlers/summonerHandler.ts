import { http, HttpResponse } from 'msw';
import { SummonerDetailResponse, SummonerUpdatingResponse } from '@/types/api';

export const summonerHandler = [
  // GET /summoner/detail/{name}/{tag} - 소환사 상세 정보 조회
  http.get(
    `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/detail/:name/:tag`,
    ({ params }) => {
      const { name, tag } = params;

      const now = Date.now();

      const response: SummonerDetailResponse = {
        success: true,
        err: null,
        data: {
          summoner: {
            puuid: 'S8cBp_0_abcdef123456',
            gameName: String(name),
            tagLine: String(tag),
            summonerLevel: 523,
            profileIconId: 4901,
            rank: {
              queue: 'RANKED_TFT',
              tier: 'CHALLENGER',
              division: 'I',
              lp: 1802,
              wins: 120,
              losses: 98,
              tierGraph: [
                // Today
                {
                  matchId: 'KR_match_001',
                  gameDatetime: now - 3600000, // 1 hour ago
                  placement: 1,
                },
                {
                  matchId: 'KR_match_002',
                  gameDatetime: now - 7200000, // 2 hours ago
                  placement: 3,
                },
                // Yesterday
                {
                  matchId: 'KR_match_003',
                  gameDatetime: now - 86400000 - 3600000, // 1 day + 1 hour ago
                  placement: 2,
                },
                {
                  matchId: 'KR_match_004',
                  gameDatetime: now - 86400000 - 7200000, // 1 day + 2 hours ago
                  placement: 4,
                },
                {
                  matchId: 'KR_match_005',
                  gameDatetime: now - 86400000 - 10800000, // 1 day + 3 hours ago
                  placement: 5,
                },
                // 2 days ago
                {
                  matchId: 'KR_match_006',
                  gameDatetime: now - 86400000 * 2 - 3600000,
                  placement: 2,
                },
                {
                  matchId: 'KR_match_007',
                  gameDatetime: now - 86400000 * 2 - 7200000,
                  placement: 1,
                },
                // 3 days ago
                {
                  matchId: 'KR_match_008',
                  gameDatetime: now - 86400000 * 3 - 3600000,
                  placement: 6,
                },
                {
                  matchId: 'KR_match_009',
                  gameDatetime: now - 86400000 * 3 - 7200000,
                  placement: 3,
                },
                // 4 days ago
                {
                  matchId: 'KR_match_010',
                  gameDatetime: now - 86400000 * 4 - 3600000,
                  placement: 4,
                },
                // 5 days ago
                {
                  matchId: 'KR_match_011',
                  gameDatetime: now - 86400000 * 5 - 3600000,
                  placement: 1,
                },
                {
                  matchId: 'KR_match_012',
                  gameDatetime: now - 86400000 * 5 - 7200000,
                  placement: 2,
                },
                // 6 days ago
                {
                  matchId: 'KR_match_013',
                  gameDatetime: now - 86400000 * 6 - 3600000,
                  placement: 5,
                },
                // 1 week ago
                {
                  matchId: 'KR_match_014',
                  gameDatetime: now - 86400000 * 7 - 3600000,
                  placement: 3,
                },
                {
                  matchId: 'KR_match_015',
                  gameDatetime: now - 86400000 * 7 - 7200000,
                  placement: 2,
                },
                // 8 days ago
                {
                  matchId: 'KR_match_016',
                  gameDatetime: now - 86400000 * 8 - 3600000,
                  placement: 7,
                },
                // 9 days ago
                {
                  matchId: 'KR_match_017',
                  gameDatetime: now - 86400000 * 9 - 3600000,
                  placement: 4,
                },
                {
                  matchId: 'KR_match_018',
                  gameDatetime: now - 86400000 * 9 - 7200000,
                  placement: 1,
                },
                // 10 days ago
                {
                  matchId: 'KR_match_019',
                  gameDatetime: now - 86400000 * 10 - 3600000,
                  placement: 3,
                },
                // 12 days ago
                {
                  matchId: 'KR_match_020',
                  gameDatetime: now - 86400000 * 12 - 3600000,
                  placement: 2,
                },
                // 14 days ago
                {
                  matchId: 'KR_match_021',
                  gameDatetime: now - 86400000 * 14 - 3600000,
                  placement: 8,
                },
                {
                  matchId: 'KR_match_022',
                  gameDatetime: now - 86400000 * 14 - 7200000,
                  placement: 5,
                },
              ],
            },
            rankDoubleUp: {
              queue: 'RANKED_TFT_DOUBLE_UP',
              tier: 'PLATINUM',
              division: 'IV',
              lp: 33,
              wins: 15,
              losses: 12,
              tierGraph: [],
            },
            rankTurbo: {
              queue: 'RANKED_TFT_TURBO',
              tier: 'HYPER',
              division: 'I',
              lp: 10964,
              wins: 0,
              losses: 0,
              tierGraph: [],
            },
          },
          summaryStats: {
            matchCount: 234,
            averagePlacement: 3.8,
            top4Rate: 0.625,
            winRate: 0.205,
            placementDistribution: [48, 52, 38, 35, 28, 18, 10, 5],
            mostPlayedTraits: [
              { apiName: 'Set14_Mage', displayName: '마법사', count: 52 },
              { apiName: 'Set14_Sniper', displayName: '저격수', count: 48 },
              {
                apiName: 'Set14_Duelist',
                displayName: '결투가',
                count: 42,
              },
              {
                apiName: 'Set14_Assassin',
                displayName: '암살자',
                count: 38,
              },
              {
                apiName: 'Set14_Guardian',
                displayName: '수호자',
                count: 35,
              },
            ],
            mostPlayedUnits: [
              { apiName: 'TFT14_Ahri', displayName: '아리', count: 45 },
              { apiName: 'TFT14_Jinx', displayName: '징크스', count: 38 },
              { apiName: 'TFT14_KaiSa', displayName: '카이사', count: 35 },
              { apiName: 'TFT14_Yasuo', displayName: '야스오', count: 32 },
              { apiName: 'TFT14_Akali', displayName: '아칼리', count: 28 },
            ],
          },
          matches: [
            {
              matchId: 'KR_match_20251103_001',
              gameDatetime: now - 3600000, // 1 hour ago
              placement: 1,
              queueType: 'RANKED',
              augments: ['Augment_TomeOfTraits', 'Augment_ComponentGrabBag'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
                {
                  apiName: 'Set14_Scholar',
                  displayName: '학자',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Ahri',
                  displayName: '아리',
                  tier: 3,
                  characterId: 'Ahri',
                  cost: 5,
                  traits: [
                    { apiName: 'Set14_Mage', displayName: '마법사' },
                    { apiName: 'Set14_Scholar', displayName: '학자' },
                  ],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Ahri_1752221994-Ahri.jpg',
                  items: [
                    {
                      apiName: 'RabadonsDeathcap',
                      displayName: '라바돈의 죽음모자',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/RabadonsDeathcap_1710231772-rabadonsdeathcap.png',
                    },
                    {
                      apiName: 'BlueBuff',
                      displayName: '푸른 파수꾼',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/BlueBuff_1710231772-bluebuff.png',
                    },
                    {
                      apiName: 'JeweledGauntlet',
                      displayName: '보석 건틀릿',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/JeweledGauntlet_1710231772-jeweledgauntlet.png',
                    },
                  ],
                },
                {
                  apiName: 'TFT14_Lux',
                  displayName: '럭스',
                  tier: 2,
                  characterId: 'Lux',
                  cost: 3,
                  traits: [
                    { apiName: 'Set14_Mage', displayName: '마법사' },
                    { apiName: 'Set14_Scholar', displayName: '학자' },
                  ],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Lux_1752221994-Lux.jpg',
                  items: [
                    {
                      apiName: 'Morellonomicon',
                      displayName: '모렐로노미콘',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/Morellonomicon_1710231772-morellonomicon.png',
                    },
                  ],
                },
              ],
            },
            {
              matchId: 'KR_match_20251102_001',
              gameDatetime: now - 86400000 - 3600000, // 1 day + 1 hour ago
              placement: 3,
              queueType: 'RANKED',
              augments: ['Augment_TradeSector', 'Augment_CelestialBlessing'],
              traits: [
                {
                  apiName: 'Set14_Duelist',
                  displayName: '결투가',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
                {
                  apiName: 'Set14_Sniper',
                  displayName: '저격수',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Yasuo',
                  displayName: '야스오',
                  tier: 3,
                  characterId: 'Yasuo',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Duelist', displayName: '결투가' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Yasuo_1752221994-Yasuo.jpg',
                  items: [
                    {
                      apiName: 'InfinityEdge',
                      displayName: '무한의 대검',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                    },
                    {
                      apiName: 'Bloodthirster',
                      displayName: '피바라기',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/Bloodthirster_1710231772-bloodthirster.png',
                    },
                  ],
                },
              ],
            },
            {
              matchId: 'KR_match_20251101_001',
              gameDatetime: now - 86400000 * 2 - 3600000, // 2 days ago
              placement: 5,
              queueType: 'RANKED',
              augments: ['Augment_RichGetRicher', 'Augment_Metabolic'],
              traits: [
                {
                  apiName: 'Set14_Assassin',
                  displayName: '암살자',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Akali',
                  displayName: '아칼리',
                  tier: 3,
                  characterId: 'Akali',
                  cost: 4,
                  traits: [
                    { apiName: 'Set14_Assassin', displayName: '암살자' },
                  ],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Akali_1752221994-Akali.jpg',
                  items: [
                    {
                      apiName: 'InfinityEdge',
                      displayName: '무한의 대검',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                    },
                  ],
                },
              ],
            },
            {
              matchId: 'KR_match_20251031_001',
              gameDatetime: now - 86400000 * 3 - 3600000, // 3 days ago
              placement: 2,
              queueType: 'NORMAL',
              augments: ['Augment_Windfall', 'Augment_LootSubscription'],
              traits: [
                {
                  apiName: 'Set14_Bruiser',
                  displayName: '투사',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Sett',
                  displayName: '세트',
                  tier: 2,
                  characterId: 'Sett',
                  cost: 3,
                  traits: [{ apiName: 'Set14_Bruiser', displayName: '투사' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Sett_1752221994-Sett.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_20251030_001',
              gameDatetime: now - 86400000 * 4 - 3600000, // 4 days ago
              placement: 4,
              queueType: 'RANKED',
              augments: ['Augment_TomeOfTraits', 'Augment_PandorasItems'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Syndra',
                  displayName: '신드라',
                  tier: 3,
                  characterId: 'Syndra',
                  cost: 4,
                  traits: [{ apiName: 'Set14_Mage', displayName: '마법사' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Syndra_1752221994-Syndra.jpg',
                  items: [
                    {
                      apiName: 'RabadonsDeathcap',
                      displayName: '라바돈의 죽음모자',
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/items/RabadonsDeathcap_1710231772-rabadonsdeathcap.png',
                    },
                  ],
                },
              ],
            },
            // Match 6
            {
              matchId: 'KR_match_006',
              gameDatetime: now - 86400000 * 5 - 3600000,
              placement: 2,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Sniper',
                  displayName: '저격수',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Jinx',
                  displayName: '징크스',
                  tier: 3,
                  characterId: 'Jinx',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Jinx.jpg',
                  items: [],
                },
              ],
            },
            // Match 7-20 (adding more matches)
            {
              matchId: 'KR_match_007',
              gameDatetime: now - 86400000 * 6 - 3600000,
              placement: 1,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Sniper',
                  displayName: '저격수',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Jinx',
                  displayName: '징크스',
                  tier: 3,
                  characterId: 'Jinx',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Jinx.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_008',
              gameDatetime: now - 86400000 * 7 - 3600000,
              placement: 2,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Ahri',
                  displayName: '아리',
                  tier: 2,
                  characterId: 'Ahri',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Mage', displayName: '마법사' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Ahri.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_009',
              gameDatetime: now - 86400000 * 8 - 3600000,
              placement: 3,
              queueType: 'NORMAL',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Duelist',
                  displayName: '결투가',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Yasuo',
                  displayName: '야스오',
                  tier: 2,
                  characterId: 'Yasuo',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Duelist', displayName: '결투가' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Yasuo.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_010',
              gameDatetime: now - 86400000 * 9 - 3600000,
              placement: 4,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Assassin',
                  displayName: '암살자',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Akali',
                  displayName: '아칼리',
                  tier: 2,
                  characterId: 'Akali',
                  cost: 4,
                  traits: [
                    { apiName: 'Set14_Assassin', displayName: '암살자' },
                  ],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Akali.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_011',
              gameDatetime: now - 86400000 * 10 - 3600000,
              placement: 5,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_KaiSa',
                  displayName: '카이사',
                  tier: 2,
                  characterId: 'KaiSa',
                  cost: 4,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/KaiSa.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_012',
              gameDatetime: now - 86400000 * 11 - 3600000,
              placement: 6,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Duelist',
                  displayName: '결투가',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Yasuo',
                  displayName: '야스오',
                  tier: 2,
                  characterId: 'Yasuo',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Duelist', displayName: '결투가' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Yasuo.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_013',
              gameDatetime: now - 86400000 * 12 - 3600000,
              placement: 7,
              queueType: 'NORMAL',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Bruiser',
                  displayName: '투사',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Jinx',
                  displayName: '징크스',
                  tier: 1,
                  characterId: 'Jinx',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Jinx.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_014',
              gameDatetime: now - 86400000 * 13 - 3600000,
              placement: 8,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Ahri',
                  displayName: '아리',
                  tier: 1,
                  characterId: 'Ahri',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Mage', displayName: '마법사' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Ahri.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_015',
              gameDatetime: now - 86400000 * 14 - 3600000,
              placement: 1,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Sniper',
                  displayName: '저격수',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Jinx',
                  displayName: '징크스',
                  tier: 3,
                  characterId: 'Jinx',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Jinx.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_016',
              gameDatetime: now - 86400000 * 15 - 3600000,
              placement: 2,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Assassin',
                  displayName: '암살자',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Akali',
                  displayName: '아칼리',
                  tier: 3,
                  characterId: 'Akali',
                  cost: 4,
                  traits: [
                    { apiName: 'Set14_Assassin', displayName: '암살자' },
                  ],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Akali.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_017',
              gameDatetime: now - 86400000 * 16 - 3600000,
              placement: 3,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Duelist',
                  displayName: '결투가',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Yasuo',
                  displayName: '야스오',
                  tier: 3,
                  characterId: 'Yasuo',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Duelist', displayName: '결투가' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Yasuo.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_018',
              gameDatetime: now - 86400000 * 17 - 3600000,
              placement: 4,
              queueType: 'NORMAL',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 2,
                  tierTotal: 3,
                  numUnits: 4,
                  style: 2,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_KaiSa',
                  displayName: '카이사',
                  tier: 2,
                  characterId: 'KaiSa',
                  cost: 4,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/KaiSa.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_019',
              gameDatetime: now - 86400000 * 18 - 3600000,
              placement: 5,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Sniper',
                  displayName: '저격수',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Jinx',
                  displayName: '징크스',
                  tier: 2,
                  characterId: 'Jinx',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Sniper', displayName: '저격수' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Jinx.jpg',
                  items: [],
                },
              ],
            },
            {
              matchId: 'KR_match_020',
              gameDatetime: now - 86400000 * 19 - 3600000,
              placement: 6,
              queueType: 'RANKED',
              augments: ['Augment_A', 'Augment_B'],
              traits: [
                {
                  apiName: 'Set14_Mage',
                  displayName: '마법사',
                  tierCurrent: 3,
                  tierTotal: 3,
                  numUnits: 6,
                  style: 3,
                },
              ],
              units: [
                {
                  apiName: 'TFT14_Ahri',
                  displayName: '아리',
                  tier: 2,
                  characterId: 'Ahri',
                  cost: 5,
                  traits: [{ apiName: 'Set14_Mage', displayName: '마법사' }],
                  iconUrl:
                    'https://cdn.lolchess.gg/upload/images/champions/Ahri.jpg',
                  items: [],
                },
              ],
            },
          ],
          matchDetails: [
            {
              matchId: 'KR_match_20251103_001',
              gameDatetime: now - 3600000,
              gameDurationSeconds: 1845,
              queueType: 'RANKED',
              players: [
                {
                  placement: 1,
                  puuid: 'S8cBp_0_abcdef123456',
                  gameName: String(name),
                  tagLine: String(tag),
                  level: 8,
                  lastRound: '5-3',
                  augments: [
                    'Augment_TomeOfTraits',
                    'Augment_ComponentGrabBag',
                  ],
                  traits: [
                    {
                      apiName: 'Set14_Mage',
                      displayName: '마법사',
                      tierCurrent: 3,
                      tierTotal: 3,
                      numUnits: 6,
                      style: 3,
                    },
                  ],
                  units: [
                    {
                      apiName: 'TFT14_Ahri',
                      displayName: '아리',
                      tier: 3,
                      characterId: 'Ahri',
                      cost: 5,
                      traits: [
                        { apiName: 'Set14_Mage', displayName: '마법사' },
                      ],
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/champions/Ahri_1752221994-Ahri.jpg',
                      items: [
                        {
                          apiName: 'RabadonsDeathcap',
                          displayName: '라바돈의 죽음모자',
                          iconUrl:
                            'https://cdn.lolchess.gg/upload/images/items/RabadonsDeathcap_1710231772-rabadonsdeathcap.png',
                        },
                      ],
                    },
                  ],
                  goldLeft: 5,
                  damageDealt: 12500,
                },
                {
                  placement: 2,
                  puuid: 'player2_puuid',
                  gameName: 'Player2',
                  tagLine: 'KR1',
                  level: 8,
                  lastRound: '5-3',
                  augments: ['Augment_TradeSector', 'Augment_Windfall'],
                  traits: [
                    {
                      apiName: 'Set14_Duelist',
                      displayName: '결투가',
                      tierCurrent: 3,
                      tierTotal: 3,
                      numUnits: 6,
                      style: 3,
                    },
                  ],
                  units: [
                    {
                      apiName: 'TFT14_Yasuo',
                      displayName: '야스오',
                      tier: 3,
                      characterId: 'Yasuo',
                      cost: 5,
                      traits: [
                        { apiName: 'Set14_Duelist', displayName: '결투가' },
                      ],
                      iconUrl:
                        'https://cdn.lolchess.gg/upload/images/champions/Yasuo_1752221994-Yasuo.jpg',
                      items: [],
                    },
                  ],
                  goldLeft: 8,
                  damageDealt: 11200,
                },
                {
                  placement: 3,
                  puuid: 'player3_puuid',
                  gameName: 'Player3',
                  tagLine: 'KR1',
                  level: 8,
                  lastRound: '5-2',
                  augments: ['Augment_RichGetRicher', 'Augment_Metabolic'],
                  traits: [],
                  units: [],
                  goldLeft: 12,
                  damageDealt: 9800,
                },
                {
                  placement: 4,
                  puuid: 'player4_puuid',
                  gameName: 'Player4',
                  tagLine: 'KR1',
                  level: 7,
                  lastRound: '5-1',
                  augments: [],
                  traits: [],
                  units: [],
                  goldLeft: 3,
                  damageDealt: 8500,
                },
                {
                  placement: 5,
                  puuid: 'player5_puuid',
                  gameName: 'Player5',
                  tagLine: 'KR1',
                  level: 7,
                  lastRound: '4-7',
                  augments: [],
                  traits: [],
                  units: [],
                  goldLeft: 6,
                  damageDealt: 7200,
                },
                {
                  placement: 6,
                  puuid: 'player6_puuid',
                  gameName: 'Player6',
                  tagLine: 'KR1',
                  level: 7,
                  lastRound: '4-5',
                  augments: [],
                  traits: [],
                  units: [],
                  goldLeft: 2,
                  damageDealt: 6100,
                },
                {
                  placement: 7,
                  puuid: 'player7_puuid',
                  gameName: 'Player7',
                  tagLine: 'KR1',
                  level: 6,
                  lastRound: '4-3',
                  augments: [],
                  traits: [],
                  units: [],
                  goldLeft: 4,
                  damageDealt: 4800,
                },
                {
                  placement: 8,
                  puuid: 'player8_puuid',
                  gameName: 'Player8',
                  tagLine: 'KR1',
                  level: 6,
                  lastRound: '4-1',
                  augments: [],
                  traits: [],
                  units: [],
                  goldLeft: 1,
                  damageDealt: 3500,
                },
              ],
            },
          ],
          fetchedAt: now,
        },
      };

      return HttpResponse.json(response);
    },
  ),

  // GET /summoner/{id}/check/updating - 소환사 갱신 상태 확인
  http.get(
    `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/:id/check/updating`,
    ({ params }) => {
      const { id } = params;
      const now = Date.now();

      const response: SummonerUpdatingResponse = {
        success: true,
        err: null,
        data: {
          puuid: String(id),
          updating: false,
          lastUpdatedAt: now - 300000, // 5 minutes ago
          lastRequestedAt: now - 300000,
          message: '갱신 완료',
          lastError: null,
        },
      };

      return HttpResponse.json(response);
    },
  ),

  // POST /summoner/refresh/{name}/{tag} - 소환사 정보 즉시 갱신
  http.post(
    `${process.env.NEXT_PUBLIC_API_SERVER}/summoner/refresh/:name/:tag`,
    ({ params }) => {
      const { name, tag } = params;
      const now = Date.now();

      // Same structure as detail endpoint but with fresh data
      const response: SummonerDetailResponse = {
        success: true,
        err: null,
        data: {
          summoner: {
            puuid: 'S8cBp_0_abcdef123456',
            gameName: String(name),
            tagLine: String(tag),
            summonerLevel: 523,
            profileIconId: 4901,
            rank: {
              queue: 'RANKED_TFT',
              tier: 'CHALLENGER',
              division: 'I',
              lp: 1842,
              wins: 121,
              losses: 98,
              tierGraph: [
                // New match just added
                {
                  matchId: 'KR_match_fresh_001',
                  gameDatetime: now - 1800000, // 30 minutes ago
                  placement: 1,
                },
                // Today
                {
                  matchId: 'KR_match_001',
                  gameDatetime: now - 3600000,
                  placement: 1,
                },
                {
                  matchId: 'KR_match_002',
                  gameDatetime: now - 7200000,
                  placement: 3,
                },
                // Yesterday
                {
                  matchId: 'KR_match_003',
                  gameDatetime: now - 86400000 - 3600000,
                  placement: 2,
                },
                {
                  matchId: 'KR_match_004',
                  gameDatetime: now - 86400000 - 7200000,
                  placement: 4,
                },
                {
                  matchId: 'KR_match_005',
                  gameDatetime: now - 86400000 - 10800000,
                  placement: 5,
                },
                // 2 days ago
                {
                  matchId: 'KR_match_006',
                  gameDatetime: now - 86400000 * 2 - 3600000,
                  placement: 2,
                },
                {
                  matchId: 'KR_match_007',
                  gameDatetime: now - 86400000 * 2 - 7200000,
                  placement: 1,
                },
                // 3 days ago
                {
                  matchId: 'KR_match_008',
                  gameDatetime: now - 86400000 * 3 - 3600000,
                  placement: 6,
                },
                {
                  matchId: 'KR_match_009',
                  gameDatetime: now - 86400000 * 3 - 7200000,
                  placement: 3,
                },
                // 4 days ago
                {
                  matchId: 'KR_match_010',
                  gameDatetime: now - 86400000 * 4 - 3600000,
                  placement: 4,
                },
                // 5 days ago
                {
                  matchId: 'KR_match_011',
                  gameDatetime: now - 86400000 * 5 - 3600000,
                  placement: 1,
                },
                {
                  matchId: 'KR_match_012',
                  gameDatetime: now - 86400000 * 5 - 7200000,
                  placement: 2,
                },
                // 6 days ago
                {
                  matchId: 'KR_match_013',
                  gameDatetime: now - 86400000 * 6 - 3600000,
                  placement: 5,
                },
                // 1 week ago
                {
                  matchId: 'KR_match_014',
                  gameDatetime: now - 86400000 * 7 - 3600000,
                  placement: 3,
                },
                {
                  matchId: 'KR_match_015',
                  gameDatetime: now - 86400000 * 7 - 7200000,
                  placement: 2,
                },
                // 8 days ago
                {
                  matchId: 'KR_match_016',
                  gameDatetime: now - 86400000 * 8 - 3600000,
                  placement: 7,
                },
                // 9 days ago
                {
                  matchId: 'KR_match_017',
                  gameDatetime: now - 86400000 * 9 - 3600000,
                  placement: 4,
                },
                {
                  matchId: 'KR_match_018',
                  gameDatetime: now - 86400000 * 9 - 7200000,
                  placement: 1,
                },
                // 10 days ago
                {
                  matchId: 'KR_match_019',
                  gameDatetime: now - 86400000 * 10 - 3600000,
                  placement: 3,
                },
                // 12 days ago
                {
                  matchId: 'KR_match_020',
                  gameDatetime: now - 86400000 * 12 - 3600000,
                  placement: 2,
                },
                // 14 days ago
                {
                  matchId: 'KR_match_021',
                  gameDatetime: now - 86400000 * 14 - 3600000,
                  placement: 8,
                },
                {
                  matchId: 'KR_match_022',
                  gameDatetime: now - 86400000 * 14 - 7200000,
                  placement: 5,
                },
              ],
            },
            rankDoubleUp: {
              queue: 'RANKED_TFT_DOUBLE_UP',
              tier: 'PLATINUM',
              division: 'IV',
              lp: 33,
              wins: 15,
              losses: 12,
              tierGraph: [],
            },
            rankTurbo: {
              queue: 'RANKED_TFT_TURBO',
              tier: 'HYPER',
              division: 'I',
              lp: 10964,
              wins: 0,
              losses: 0,
              tierGraph: [],
            },
          },
          summaryStats: {
            matchCount: 235, // Updated count
            averagePlacement: 3.7,
            top4Rate: 0.635,
            winRate: 0.21,
            placementDistribution: [49, 52, 38, 35, 28, 18, 10, 5],
            mostPlayedTraits: [
              { apiName: 'Set14_Mage', displayName: '마법사', count: 53 },
            ],
            mostPlayedUnits: [
              { apiName: 'TFT14_Ahri', displayName: '아리', count: 46 },
            ],
          },
          matches: [],
          matchDetails: [],
          fetchedAt: now,
        },
      };

      return HttpResponse.json(response);
    },
  ),
];
