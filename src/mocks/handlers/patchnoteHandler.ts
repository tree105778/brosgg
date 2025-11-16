import { http, HttpResponse } from 'msw';
import {
  PatchNoteSummary,
  PatchNoteDetail,
  PatchNoteTabContent,
} from '@/types/api';

// Mock patch note data
const mockPatchNoteDetails: PatchNoteDetail[] = [
  // 14.7 Patch Note (Latest, Active)
  {
    id: 'patch-14-7',
    season: 14,
    version: '14.7',
    title: '14.7 패치노트',
    active: true,
    releaseTs: '2025-07-02T00:00:00Z',
    content: JSON.stringify({
      시스템: [
        {
          name: '게임 시스템',
          changes: [
            {
              label: '플레이어 데미지 계산 방식이 개선되었습니다.',
              type: 'neutral',
            },
          ],
        },
        {
          name: '랭크 시스템',
          changes: [
            {
              label: '라운드 타이머가 30초에서 35초로 증가했습니다.',
              type: 'buff',
            },
            {
              label:
                '골드 이자 시스템이 10골드당 1골드에서 10골드당 2골드로 변경되었습니다.',
              type: 'buff',
            },
          ],
        },
      ],
      챔피언: [
        {
          name: '니달리',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Nidalee_1752221994-Nidalee.jpg',
          traits: ['니토로', '흉폭한'],
          changes: [
            { label: '체력: 200 ⇒ 150', type: 'nerf' },
            { label: '체력: 200 ⇒ 150', type: 'nerf' },
          ],
        },
        {
          name: '징크스',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Jinx_1752221994-Jinx.jpg',
          traits: ['미포', '스나이퍼'],
          changes: [
            { label: '공격력: 65 ⇒ 70', type: 'buff' },
            { label: '체력: 650 ⇒ 700', type: 'buff' },
          ],
        },
        {
          name: '스웨인',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Swain_1752221994-Swain.jpg',
          traits: ['흑마법사', '지배자'],
          changes: [
            { label: '스킬 데미지: 300/450/900 ⇒ 280/420/850', type: 'nerf' },
          ],
        },
        {
          name: '에코',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Ekko_1752221994-Ekko.jpg',
          traits: ['미포', '스카이벨'],
          changes: [
            { label: '마나: 40/80 ⇒ 30/70', type: 'buff' },
            { label: '스킬 데미지: 200/300/450 ⇒ 220/330/500', type: 'buff' },
          ],
        },
        {
          name: '워윅',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Warwick_1752221994-Warwick.jpg',
          traits: ['감시자', '브루저'],
          changes: [
            { label: '체력: 950 ⇒ 900', type: 'nerf' },
            { label: '공격 속도: 0.75 ⇒ 0.80', type: 'buff' },
          ],
        },
        {
          name: '블라디미르',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Vladimir_1752221994-Vladimir.jpg',
          traits: ['흑마법사', '학자'],
          changes: [
            { label: '스킬 데미지: 180/270/405 ⇒ 200/300/450', type: 'buff' },
          ],
        },
        {
          name: '바이',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Vi_1752221994-Vi.jpg',
          traits: ['감시자', '집행자'],
          changes: [{ label: '체력: 800 ⇒ 750', type: 'nerf' }],
        },
        {
          name: '케이틀린',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Caitlyn_1752221994-Caitlyn.jpg',
          traits: ['지배자', '스나이퍼'],
          changes: [{ label: '공격력: 70 ⇒ 75', type: 'buff' }],
        },
      ],
      시너지: [
        {
          name: '치험자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Watcher_1752221994-Set14_Watcher.png',
          changes: [
            { label: '(3) 체력: 200 ⇒ 150', type: 'nerf' },
            { label: '(5) 체력: 200 ⇒ 150', type: 'nerf' },
            { label: '(7) 체력: 200 ⇒ 300', type: 'buff' },
          ],
        },
        {
          name: '미포',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Family_1752221994-Set14_Family.png',
          changes: [
            { label: '(3) 공격 속도: 20% ⇒ 25%', type: 'buff' },
            { label: '(4) 공격 속도: 40% ⇒ 45%', type: 'buff' },
          ],
        },
        {
          name: '흑마법사',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_BlackRose_1752221994-Set14_BlackRose.png',
          changes: [
            { label: '(3) 추가 주문력: 20 ⇒ 18', type: 'nerf' },
            { label: '(5) 추가 주문력: 50 ⇒ 45', type: 'nerf' },
          ],
        },
        {
          name: '브루저',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Bruiser_1752221994-Set14_Bruiser.png',
          changes: [
            { label: '(2) 체력: 15% ⇒ 18%', type: 'buff' },
            { label: '(4) 체력: 35% ⇒ 40%', type: 'buff' },
          ],
        },
        {
          name: '스나이퍼',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Sniper_1752221994-Set14_Sniper.png',
          changes: [{ label: '(2) 추가 사거리: 1 ⇒ 2', type: 'buff' }],
        },
      ],
      아이템: [
        {
          name: '무한의 대검',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/InfinityEdge_1710231772-infinityedge.png',
          changes: [{ label: '공격력 증가: 15 ⇒ 13', type: 'nerf' }],
        },
        {
          name: '거인 학살자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/GiantSlayer_1710231772-giantslayer.png',
          changes: [
            { label: '공격력: 10 ⇒ 12', type: 'buff' },
            { label: '추가 피해: 25% ⇒ 30%', type: 'buff' },
          ],
        },
        {
          name: '피바라기',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/Bloodthirster_1710231772-bloodthirster.png',
          changes: [
            { label: '공격력: 15 ⇒ 20', type: 'buff' },
            { label: '흡혈: 25% ⇒ 20%', type: 'nerf' },
          ],
        },
        {
          name: '쇼진의 창',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/SpearOfShojin_1710231772-spearofshojin.png',
          changes: [{ label: '마나 회복: 15 ⇒ 18', type: 'buff' }],
        },
        {
          name: '수호 천사',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/GuardianAngel_1710231772-guardianangel.png',
          changes: [{ label: '부활 체력: 500 ⇒ 600', type: 'buff' }],
        },
        {
          name: '마법공학 총',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/HextechGunblade_1710231772-hextechgunblade.png',
          changes: [
            { label: '주문력: 25 ⇒ 30', type: 'buff' },
            { label: '공격력: 15 ⇒ 20', type: 'buff' },
          ],
        },
      ],
      증강제: [
        {
          name: '빠른 판단',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_1_1710231772-augment1.png',
          changes: [{ label: '체력: 200 ⇒ 150', type: 'nerf' }],
        },
        {
          name: '팀워크',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_2_1710231772-augment2.png',
          changes: [{ label: '공격 속도 보너스: 10% ⇒ 12%', type: 'buff' }],
        },
        {
          name: '금고',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_3_1710231772-augment3.png',
          changes: [{ label: '골드 획득: 20 ⇒ 25', type: 'buff' }],
        },
        {
          name: '전투 훈련',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_4_1710231772-augment4.png',
          changes: [{ label: '공격력 증가: 5% ⇒ 8%', type: 'buff' }],
        },
      ],
    } as PatchNoteTabContent),
  },

  // 14.6 Patch Note (Active)
  {
    id: 'patch-14-6',
    season: 14,
    version: '14.6',
    title: '14.6 패치노트',
    active: true,
    releaseTs: '2025-06-18T00:00:00Z',
    content: JSON.stringify({
      시스템: [
        {
          name: '게임 시스템',
          changes: [
            {
              label: '경험치 획득량이 소폭 증가했습니다.',
              type: 'buff',
            },
          ],
        },
      ],
      챔피언: [
        {
          name: '트위치',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Twitch_1752221994-Twitch.jpg',
          traits: ['실험체', '스나이퍼'],
          changes: [
            { label: '공격력: 60 ⇒ 55', type: 'nerf' },
            { label: '스킬 데미지: 250/375/600 ⇒ 230/345/550', type: 'nerf' },
          ],
        },
        {
          name: '다리우스',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Darius_1752221994-Darius.jpg',
          traits: ['정복자', '브루저'],
          changes: [{ label: '체력: 700 ⇒ 750', type: 'buff' }],
        },
        {
          name: '제이스',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Jayce_1752221994-Jayce.jpg',
          traits: ['테크', '집행자'],
          changes: [
            { label: '스킬 데미지: 200/300/500 ⇒ 220/330/550', type: 'buff' },
          ],
        },
        {
          name: '르블랑',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/LeBlanc_1752221994-LeBlanc.jpg',
          traits: ['흑마법사', '마법사'],
          changes: [{ label: '마나: 50/100 ⇒ 40/90', type: 'buff' }],
        },
        {
          name: '파우더',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Powder_1752221994-Powder.jpg',
          traits: ['미포', '테크'],
          changes: [{ label: '공격 속도: 0.70 ⇒ 0.75', type: 'buff' }],
        },
        {
          name: '직스',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Ziggs_1752221994-Ziggs.jpg',
          traits: ['테크', '마법사'],
          changes: [
            { label: '스킬 데미지: 150/225/350 ⇒ 140/210/330', type: 'nerf' },
          ],
        },
      ],
      시너지: [
        {
          name: '실험체',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Experiment_1752221994-Set14_Experiment.png',
          changes: [
            { label: '(3) 능력치 증가: 25% ⇒ 30%', type: 'buff' },
            { label: '(5) 능력치 증가: 60% ⇒ 70%', type: 'buff' },
          ],
        },
        {
          name: '테크',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Tech_1752221994-Set14_Tech.png',
          changes: [{ label: '(3) 추가 아이템 효과: 40% ⇒ 35%', type: 'nerf' }],
        },
        {
          name: '마법사',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Mage_1752221994-Set14_Mage.png',
          changes: [{ label: '(3) 주문력: 30 ⇒ 35', type: 'buff' }],
        },
        {
          name: '정복자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Conqueror_1752221994-Set14_Conqueror.png',
          changes: [{ label: '(2) 공격력/주문력: 15 ⇒ 18', type: 'buff' }],
        },
      ],
      아이템: [
        {
          name: '라바돈의 모자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/RabadonsDeathcap_1710231772-rabadonsdeathcap.png',
          changes: [{ label: '주문력: 50 ⇒ 55', type: 'buff' }],
        },
        {
          name: '이온 충격기',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/IonicSpark_1710231772-ionicspark.png',
          changes: [{ label: '마법 저항력 감소: 30% ⇒ 25%', type: 'nerf' }],
        },
        {
          name: '수은',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/Quicksilver_1710231772-quicksilver.png',
          changes: [{ label: '지속 시간: 10초 ⇒ 12초', type: 'buff' }],
        },
        {
          name: '정의의 손',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/HandOfJustice_1710231772-handofjustice.png',
          changes: [{ label: '공격력/주문력: 15-35 ⇒ 18-40', type: 'buff' }],
        },
      ],
      증강제: [
        {
          name: '경험치 가속',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_5_1710231772-augment5.png',
          changes: [{ label: '경험치: +4 ⇒ +5', type: 'buff' }],
        },
        {
          name: '골드 벌이',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_6_1710231772-augment6.png',
          changes: [{ label: '골드: +3 ⇒ +4', type: 'buff' }],
        },
        {
          name: '최후의 저항',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_7_1710231772-augment7.png',
          changes: [{ label: '방어력/마법 저항력: 20 ⇒ 25', type: 'buff' }],
        },
      ],
    } as PatchNoteTabContent),
  },

  // 14.5 Patch Note (Inactive)
  {
    id: 'patch-14-5',
    season: 14,
    version: '14.5',
    title: '14.5 패치노트',
    active: false,
    releaseTs: '2025-06-04T00:00:00Z',
    content: JSON.stringify({
      시스템: [
        {
          name: '게임 시스템',
          changes: [
            {
              label: '상점 리롤 비용이 1골드 감소했습니다.',
              type: 'buff',
            },
          ],
        },
        {
          name: '아이템 시스템',
          changes: [
            {
              label: '아이템 드롭률이 조정되었습니다.',
              type: 'neutral',
            },
          ],
        },
      ],
      챔피언: [
        {
          name: '레나타',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Renata_1752221994-Renata.jpg',
          traits: ['실험체', '학자'],
          changes: [
            { label: '스킬 데미지: 180/270/450 ⇒ 200/300/500', type: 'buff' },
            { label: '마나: 60/120 ⇒ 50/110', type: 'buff' },
          ],
        },
        {
          name: '아리',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Ahri_1752221994-Ahri.jpg',
          traits: ['흑마법사', '마법사'],
          changes: [{ label: '체력: 550 ⇒ 500', type: 'nerf' }],
        },
        {
          name: '세라핀',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Seraphine_1752221994-Seraphine.jpg',
          traits: ['학자', '마법사'],
          changes: [{ label: '스킬 범위: 2헥스 ⇒ 3헥스', type: 'buff' }],
        },
        {
          name: '베이가',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Veigar_1752221994-Veigar.jpg',
          traits: ['흑마법사', '마법사'],
          changes: [
            { label: '스킬 데미지: 250/375/625 ⇒ 230/345/590', type: 'nerf' },
          ],
        },
        {
          name: '말자하',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Malzahar_1752221994-Malzahar.jpg',
          traits: ['실험체', '마법사'],
          changes: [{ label: '공격력: 45 ⇒ 50', type: 'buff' }],
        },
      ],
      시너지: [
        {
          name: '학자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Scholar_1752221994-Set14_Scholar.png',
          changes: [
            { label: '(2) 마나 회복: 5 ⇒ 7', type: 'buff' },
            { label: '(4) 마나 회복: 15 ⇒ 18', type: 'buff' },
          ],
        },
        {
          name: '지하도시',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Underground_1752221994-Set14_Underground.png',
          changes: [{ label: '(3) 회피율: 20% ⇒ 25%', type: 'buff' }],
        },
      ],
      아이템: [
        {
          name: '모렐로노미콘',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/Morellonomicon_1710231772-morellonomicon.png',
          changes: [{ label: '화상 피해: 20% ⇒ 25%', type: 'buff' }],
        },
        {
          name: '청룡도',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/BlueBuff_1710231772-bluebuff.png',
          changes: [{ label: '마나 회복: 20 ⇒ 25', type: 'buff' }],
        },
        {
          name: '가시 조끼',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/Thornmail_1710231772-thornmail.png',
          changes: [{ label: '반사 피해: 100 ⇒ 120', type: 'buff' }],
        },
      ],
      증강제: [
        {
          name: '부자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_8_1710231772-augment8.png',
          changes: [{ label: '이자 골드: +1 ⇒ +2', type: 'buff' }],
        },
        {
          name: '빠른 성장',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_9_1710231772-augment9.png',
          changes: [{ label: '레벨업 비용 감소: 4골드 ⇒ 5골드', type: 'buff' }],
        },
      ],
    } as PatchNoteTabContent),
  },

  // 14.4 Patch Note (Active)
  {
    id: 'patch-14-4',
    season: 14,
    version: '14.4',
    title: '14.4 패치노트',
    active: true,
    releaseTs: '2025-05-21T00:00:00Z',
    content: JSON.stringify({
      시스템: [
        {
          name: '게임 시스템',
          changes: [
            {
              label: '크립 라운드 난이도가 조정되었습니다.',
              type: 'neutral',
            },
          ],
        },
      ],
      챔피언: [
        {
          name: '카밀',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Camille_1752221994-Camille.jpg',
          traits: ['집행자', '감시자'],
          changes: [
            { label: '공격력: 55 ⇒ 60', type: 'buff' },
            { label: '체력: 650 ⇒ 600', type: 'nerf' },
          ],
        },
        {
          name: '애쉬',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Ashe_1752221994-Ashe.jpg',
          traits: ['스나이퍼', '집행자'],
          changes: [{ label: '스킬 둔화: 40% ⇒ 50%', type: 'buff' }],
        },
        {
          name: '신드라',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Syndra_1752221994-Syndra.jpg',
          traits: ['흑마법사', '마법사'],
          changes: [
            { label: '스킬 데미지: 220/330/550 ⇒ 200/300/500', type: 'nerf' },
          ],
        },
        {
          name: '드레이븐',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/champions/Draven_1752221994-Draven.jpg',
          traits: ['정복자', '집행자'],
          changes: [{ label: '공격력: 65 ⇒ 70', type: 'buff' }],
        },
      ],
      시너지: [
        {
          name: '집행자',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Enforcer_1752221994-Set14_Enforcer.png',
          changes: [
            { label: '(2) 방어력: 30 ⇒ 35', type: 'buff' },
            { label: '(4) 방어력: 80 ⇒ 90', type: 'buff' },
          ],
        },
        {
          name: '스카이벨',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/traits/Set14_Skybell_1752221994-Set14_Skybell.png',
          changes: [{ label: '(3) 보호막: 250 ⇒ 300', type: 'buff' }],
        },
      ],
      아이템: [
        {
          name: '최후의 속삭임',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/LastWhisper_1710231772-lastwhisper.png',
          changes: [{ label: '방어력 관통: 50% ⇒ 60%', type: 'buff' }],
        },
        {
          name: '타이탄의 결의',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/items/TitansResolve_1710231772-titansresolve.png',
          changes: [{ label: '최대 스택: 25 ⇒ 30', type: 'buff' }],
        },
      ],
      증강제: [
        {
          name: '메타트론',
          imageUrl:
            'https://cdn.lolchess.gg/upload/images/augments/Augment_10_1710231772-augment10.png',
          changes: [{ label: '체력 회복: 3% ⇒ 4%', type: 'buff' }],
        },
      ],
    } as PatchNoteTabContent),
  },
];

// Generate summary data from detail data
const mockPatchNoteSummaries: PatchNoteSummary[] = mockPatchNoteDetails.map(
  (detail) => ({
    id: detail.id,
    season: detail.season,
    version: detail.version,
    title: detail.title,
    active: detail.active,
    releaseTs: detail.releaseTs,
  }),
);

export const patchnoteHandler = [
  // GET /patchnote - 패치노트 목록 조회
  http.get(`${process.env.NEXT_PUBLIC_API_SERVER}/patchnote`, ({ request }) => {
    const url = new URL(request.url);
    const active = url.searchParams.get('active');

    let filteredPatchNotes = [...mockPatchNoteSummaries];

    // Filter by active status
    if (active === 'y') {
      filteredPatchNotes = filteredPatchNotes.filter(
        (patchNote) => patchNote.active === true,
      );
    } else if (active === 'n') {
      filteredPatchNotes = filteredPatchNotes.filter(
        (patchNote) => patchNote.active === false,
      );
    }
    // If no active parameter, return all

    // Sort by releaseTs descending (latest first)
    filteredPatchNotes.sort(
      (a, b) =>
        new Date(b.releaseTs).getTime() - new Date(a.releaseTs).getTime(),
    );

    return HttpResponse.json({
      success: true,
      data: filteredPatchNotes,
      err: null,
    });
  }),

  // GET /patchnote/:id - 패치노트 상세 조회
  http.get(
    `${process.env.NEXT_PUBLIC_API_SERVER}/patchnote/:id`,
    ({ params }) => {
      const { id } = params;

      const patchNote = mockPatchNoteDetails.find(
        (patchNote) => patchNote.id === id,
      );

      if (patchNote) {
        return HttpResponse.json({
          success: true,
          data: patchNote,
          err: null,
        });
      }

      return HttpResponse.json(
        {
          success: false,
          data: null,
          err: 'Patch note not found',
        },
        { status: 404 },
      );
    },
  ),
];
