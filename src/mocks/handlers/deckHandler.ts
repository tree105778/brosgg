import { http, HttpResponse } from 'msw';
import { MetaDeckSummary } from '@/types/api';

export const deckHandler = [
  // GET /api/decks - 덱 목록 조회 (meta page용 확장 응답)
  http.get(`${process.env.NEXT_PUBLIC_API_SERVER}/api/decks`, ({ request }) => {
    const url = new URL(request.url);
    const tier = url.searchParams.get('tier');
    const setVersion = url.searchParams.get('setVersion');
    const activate = url.searchParams.get('activate');

    // Mock deck data based on API documentation
    const mockDecks: MetaDeckSummary[] = [
      {
        deckId: 1,
        title: '미포 테크 덱',
        userId: 1,
        setVersion: 14,
        description:
          'FAST 8 전략으로 레벨 8까지 빠르게 올라가 미포와 테크 시너지를 완성하는 덱입니다.',
        totalUnits: 8,
        maxLevel: 8,
        tier: 'S',
        createdAt: '2025-01-02T10:00:00',
        updatedAt: '2025-01-02T10:05:00',
        activate: true,
        avgPlacement: 3.5,
        top4Rate: 48.7,
        firstRate: 21.3,
        pickRate: 8.2,
        champions: [
          {
            championId: 'Jinx',
            name: '징크스',
            cost: 5,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Jinx_1752221994-Jinx.jpg',
            items: [
              {
                apiName: 'InfinityEdge',
                name: '무한의 대검',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                composition: ['B.F. Sword', 'B.F. Sword'],
                effects: { CritDamage: 25.0 },
              },
              {
                apiName: 'GiantSlayer',
                name: '거인 학살자',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/GiantSlayer_1710231772-giantslayer.png',
                composition: ['Recurve Bow', 'B.F. Sword'],
                effects: { AttackDamage: 10.0, BonusDamage: 25.0 },
              },
            ],
          },
          {
            championId: 'Ekko',
            name: '에코',
            cost: 3,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Ekko_1752221994-Ekko.jpg',
            items: [],
          },
          {
            championId: 'Powder',
            name: '파우더',
            cost: 1,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Powder_1752221994-Powder.jpg',
            items: [],
          },
          {
            championId: 'Ziggs',
            name: '직스',
            cost: 1,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Ziggs_1752221994-Ziggs.jpg',
            items: [],
          },
        ],
        synergies: [
          { name: '미포', count: 4 },
          { name: '테크', count: 3 },
          { name: '브루저', count: 2 },
        ],
      },
      {
        deckId: 2,
        title: '흑마법사 덱',
        userId: 1,
        setVersion: 14,
        description:
          '흑마법사 시너지를 중심으로 강력한 마법 딜을 넣는 덱입니다.',
        totalUnits: 7,
        maxLevel: 8,
        tier: 'S',
        createdAt: '2025-01-02T11:00:00',
        updatedAt: '2025-01-02T11:05:00',
        activate: true,
        avgPlacement: 3.4,
        top4Rate: 52.3,
        firstRate: 19.8,
        pickRate: 9.5,
        champions: [
          {
            championId: 'Swain',
            name: '스웨인',
            cost: 5,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Swain_1752221994-Swain.jpg',
            items: [
              {
                apiName: 'SpearOfShojin',
                name: '쇼진의 창',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/SpearOfShojin_1710231772-spearofshojin.png',
                composition: ['B.F. Sword', 'Tear of the Goddess'],
                effects: { Mana: 15.0 },
              },
            ],
          },
          {
            championId: 'LeBlanc',
            name: '르블랑',
            cost: 4,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/LeBlanc_1752221994-LeBlanc.jpg',
            items: [],
          },
          {
            championId: 'Vladimir',
            name: '블라디미르',
            cost: 3,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Vladimir_1752221994-Vladimir.jpg',
            items: [],
          },
        ],
        synergies: [
          { name: '흑마법사', count: 5 },
          { name: '학자', count: 3 },
          { name: '마법사', count: 2 },
        ],
      },
      {
        deckId: 3,
        title: '감시자 브루저 덱',
        userId: 1,
        setVersion: 14,
        description:
          '감시자와 브루저 시너지로 안정적인 탱킹과 딜을 제공합니다.',
        totalUnits: 8,
        maxLevel: 8,
        tier: 'A',
        createdAt: '2025-01-02T12:00:00',
        updatedAt: '2025-01-02T12:05:00',
        activate: true,
        avgPlacement: 3.8,
        top4Rate: 46.2,
        firstRate: 16.5,
        pickRate: 7.3,
        champions: [
          {
            championId: 'Warwick',
            name: '워윅',
            cost: 5,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Warwick_1752221994-Warwick.jpg',
            items: [
              {
                apiName: 'Bloodthirster',
                name: '피바라기',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/Bloodthirster_1710231772-bloodthirster.png',
                composition: ['B.F. Sword', 'Negatron Cloak'],
                effects: { AttackDamage: 15.0, Omnivamp: 25.0 },
              },
            ],
          },
          {
            championId: 'Vi',
            name: '바이',
            cost: 4,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Vi_1752221994-Vi.jpg',
            items: [],
          },
          {
            championId: 'Darius',
            name: '다리우스',
            cost: 3,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Darius_1752221994-Darius.jpg',
            items: [],
          },
        ],
        synergies: [
          { name: '감시자', count: 4 },
          { name: '브루저', count: 4 },
          { name: '정복자', count: 2 },
        ],
      },
      {
        deckId: 4,
        title: '지배자 스나이퍼 덱',
        userId: 1,
        setVersion: 14,
        description:
          '원거리 딜러들을 중심으로 후방에서 강력한 화력을 제공합니다.',
        totalUnits: 7,
        maxLevel: 8,
        tier: 'A',
        createdAt: '2025-01-02T13:00:00',
        updatedAt: '2025-01-02T13:05:00',
        activate: true,
        avgPlacement: 4.0,
        top4Rate: 44.8,
        firstRate: 15.2,
        pickRate: 6.9,
        champions: [
          {
            championId: 'Caitlyn',
            name: '케이틀린',
            cost: 5,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Caitlyn_1752221994-Caitlyn.jpg',
            items: [
              {
                apiName: 'InfinityEdge',
                name: '무한의 대검',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                composition: ['B.F. Sword', 'B.F. Sword'],
                effects: { CritDamage: 25.0 },
              },
            ],
          },
          {
            championId: 'Jayce',
            name: '제이스',
            cost: 4,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Jayce_1752221994-Jayce.jpg',
            items: [],
          },
        ],
        synergies: [
          { name: '지배자', count: 5 },
          { name: '스나이퍼', count: 4 },
          { name: '집행자', count: 2 },
        ],
      },
      {
        deckId: 5,
        title: '실험체 덱',
        userId: 1,
        setVersion: 14,
        description: '실험체 시너지로 유닛들의 능력치를 극대화합니다.',
        totalUnits: 6,
        maxLevel: 8,
        tier: 'B',
        createdAt: '2025-01-02T14:00:00',
        updatedAt: '2025-01-02T14:05:00',
        activate: true,
        avgPlacement: 4.2,
        top4Rate: 42.5,
        firstRate: 13.8,
        pickRate: 5.6,
        champions: [
          {
            championId: 'Twitch',
            name: '트위치',
            cost: 5,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Twitch_1752221994-Twitch.jpg',
            items: [
              {
                apiName: 'InfinityEdge',
                name: '무한의 대검',
                iconUrl:
                  'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                composition: ['B.F. Sword', 'B.F. Sword'],
                effects: { CritDamage: 25.0 },
              },
            ],
          },
          {
            championId: 'Renata',
            name: '레나타',
            cost: 4,
            imageUrl:
              'https://cdn.lolchess.gg/upload/images/champions/Renata_1752221994-Renata.jpg',
            items: [],
          },
        ],
        synergies: [
          { name: '실험체', count: 5 },
          { name: '지하도시', count: 3 },
          { name: '마법사', count: 2 },
        ],
      },
    ];

    // Apply filters
    let filteredDecks = [...mockDecks];

    if (tier) {
      filteredDecks = filteredDecks.filter((deck) => deck.tier === tier);
    }

    if (setVersion) {
      filteredDecks = filteredDecks.filter(
        (deck) => deck.setVersion === parseInt(setVersion),
      );
    }

    if (activate) {
      const isActive = activate === 'true';
      filteredDecks = filteredDecks.filter(
        (deck) => deck.activate === isActive,
      );
    }

    return HttpResponse.json({
      success: true,
      data: filteredDecks,
      err: null,
    });
  }),

  // GET /api/decks/:id - 덱 상세 조회
  http.get(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks/:id`,
    ({ params }) => {
      const { id } = params;

      // Mock detailed deck data following API documentation structure
      if (id === '1') {
        return HttpResponse.json({
          success: true,
          data: {
            deckId: 1,
            title: '미포 테크 덱',
            userId: 1,
            setVersion: 14,
            description:
              'FAST 8 전략으로 레벨 8까지 빠르게 올라가 미포와 테크 시너지를 완성하는 덱입니다.',
            createdAt: '2025-01-02T10:00:00',
            updatedAt: '2025-01-02T10:05:00',
            activate: true,
            tier: 'S',
            boards: [
              {
                boardId: null,
                level: 5,
                synergies: null,
                units: [],
              },
              {
                boardId: null,
                level: 6,
                synergies: null,
                units: [],
              },
              {
                boardId: null,
                level: 7,
                synergies: null,
                units: [],
              },
              {
                boardId: 777,
                level: 8,
                synergies: '{"미포":4,"테크":3,"브루저":2}',
                units: [
                  {
                    unitId: 1001,
                    championId: 'Jinx',
                    starLevel: 2,
                    items: ['InfinityEdge', 'GiantSlayer'],
                    itemDetails: [
                      {
                        apiName: 'InfinityEdge',
                        name: '무한의 대검',
                        iconUrl:
                          'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
                        composition: ['B.F. Sword', 'B.F. Sword'],
                        effects: { CritDamage: 25.0 },
                      },
                      {
                        apiName: 'GiantSlayer',
                        name: '거인 학살자',
                        iconUrl:
                          'https://cdn.lolchess.gg/upload/images/items/GiantSlayer_1710231772-giantslayer.png',
                        composition: ['Recurve Bow', 'B.F. Sword'],
                        effects: { AttackDamage: 10.0, BonusDamage: 25.0 },
                      },
                    ],
                    imageUrl:
                      'https://cdn.lolchess.gg/upload/images/champions/Jinx_1752221994-Jinx.jpg',
                    position: { row: 1, col: 4 },
                  },
                  {
                    unitId: 1002,
                    championId: 'Ekko',
                    starLevel: 2,
                    items: [],
                    itemDetails: [],
                    imageUrl:
                      'https://cdn.lolchess.gg/upload/images/champions/Ekko_1752221994-Ekko.jpg',
                    position: { row: 2, col: 3 },
                  },
                ],
              },
              {
                boardId: null,
                level: 9,
                synergies: null,
                units: [],
              },
              {
                boardId: null,
                level: 10,
                synergies: null,
                units: [],
              },
            ],
          },
          err: null,
        });
      }

      return HttpResponse.json(
        {
          success: false,
          data: null,
          err: 'Deck not found',
        },
        { status: 404 },
      );
    },
  ),
];
