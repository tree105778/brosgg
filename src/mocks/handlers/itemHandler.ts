import { http, HttpResponse } from 'msw';

export const itemHandler = [
  http.get(`${process.env.NEXT_PUBLIC_API_SERVER}/item`, () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          id: 1,
          apiName: 'TFT_Item_BFSword',
          gameVersion: '14.22',
          name: 'B.F. 대검',
          description: '공격력을 증가시킵니다.',
          icon: 'https://d18kctlbb86miz.cloudfront.net/items/bf_sword.png',
          unique: false,
          associatedTraits: [],
          composition: [],
          effects: {
            AD: 10.0,
          },
          incompatibleTraits: [],
          tags: ['damage'],
          active: true,
        },
        {
          id: 2,
          apiName: 'TFT_Item_InfinityEdge',
          gameVersion: '14.22',
          name: '무한의 대검',
          description: '치명타 피해를 증가시킵니다.',
          icon: 'https://d18kctlbb86miz.cloudfront.net/items/infinity_edge.png',
          unique: false,
          associatedTraits: [],
          composition: ['TFT_Item_BFSword', 'TFT_Item_BFSword'],
          effects: {
            CritDamage: 25.0,
          },
          incompatibleTraits: [],
          tags: ['damage', 'crit'],
          active: true,
        },
      ],
      err: null,
    }),
  ),
  http.get(`${process.env.NEXT_PUBLIC_API_SERVER}/item/:id`, ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json({
        success: true,
        data: {
          id: 1,
          apiName: 'TFT_Item_BFSword',
          gameVersion: '14.22',
          name: 'B.F. 대검',
          description: '공격력을 증가시킵니다.',
          icon: 'https://d18kctlbb86miz.cloudfront.net/items/bf_sword.png',
          unique: false,
          associatedTraits: [],
          composition: [],
          effects: {
            AD: 10.0,
          },
          incompatibleTraits: [],
          tags: ['damage'],
          active: true,
        },
        err: null,
      });
    }
  }),
];
