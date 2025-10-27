import { http, HttpResponse } from 'msw';

export const champHandler = [
  http.get(`${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions`, () => {
    return HttpResponse.json([
      {
        id: 1,
        championId: 'aatrox',
        name: '아트록스',
        cost: 1,
        role: 'Bruiser',
        season: 15,
        active: true,
        ts: 1728036000000,
        traits: ['Darkin', 'Bruiser'],
        images: {
          square: 'https://d18kctlbb86miz.cloudfront.net/champions/aatrox.png',
        },
      },
      {
        id: 2,
        championId: 'ahri',
        name: '아리',
        cost: 2,
        role: 'Mage',
        season: 15,
        active: true,
        ts: 1728036000000,
        traits: ['Frost', 'Mage'],
        images: {
          square: 'https://d18kctlbb86miz.cloudfront.net/champions/ahri.png',
        },
      },
    ]);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/champions/:id`,
    ({ params }) => {
      const { id } = params;
      console.log('챔피언ID: ', id);
      if (id === '1') {
        return HttpResponse.json({
          id: 1,
          championId: 'aatrox',
          name: '아트록스',
          cost: 1,
          role: 'Bruiser',
          season: 15,
          active: true,
          ts: 1728036000000,
          traits: ['Darkin', 'Bruiser'],
          images: {
            square:
              'https://d18kctlbb86miz.cloudfront.net/champions/aatrox.png',
          },
          stats: {
            range: 1.0,
            attackSpeed: {
              base: 0.7,
            },
            perStar: {
              '1': {
                hp: 700,
                ad: 65,
                armor: 40,
                mr: 40,
              },
              '2': {
                hp: 1260,
                ad: 117,
                armor: 40,
                mr: 40,
              },
              '3': {
                hp: 2268,
                ad: 211,
                armor: 40,
                mr: 40,
              },
            },
            derived: {
              dps: {
                '1': 46,
                '2': 82,
                '3': 148,
              },
            },
            mana: {
              start: 0.0,
              total: 0.0,
            },
          },
          ability: {
            name: '다르킨의 검',
            icon: 'https://d18kctlbb86miz.cloudfront.net/abilities/aatrox_ability.png',
            description: '적에게 마법 피해를 입힙니다.',
          },
        });
      }
      if (id === '2') {
        return HttpResponse.json({
          id: 2,
          championId: 'ahri',
          name: '아리',
          cost: 2,
          role: 'Mage',
          season: 15,
          active: true,
          ts: 1728036000000,
          traits: ['Frost', 'Mage'],
          images: {
            square: 'https://d18kctlbb86miz.cloudfront.net/champions/ahri.png',
          },
          stats: {
            range: 4.0,
            attackSpeed: {
              base: 0.65,
            },
            perStar: {
              '1': {
                hp: 550,
                ad: 45,
                armor: 25,
                mr: 25,
              },
              '2': {
                hp: 990,
                ad: 81,
                armor: 25,
                mr: 25,
              },
              '3': {
                hp: 1782,
                ad: 146,
                armor: 25,
                mr: 25,
              },
            },
            derived: {
              dps: {
                '1': 29,
                '2': 53,
                '3': 95,
              },
            },
            mana: {
              start: 0.0,
              total: 40.0,
            },
          },
          ability: {
            name: '구슬 연발',
            icon: 'https://d18kctlbb86miz.cloudfront.net/abilities/ahri_ability.png',
            description: '적들에게 마법 피해를 입히고 체력을 회복합니다.',
          },
        });
      }
    },
  ),
];
