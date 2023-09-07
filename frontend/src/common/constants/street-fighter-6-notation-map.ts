import { ComboStepTranslation } from '../types/combo-translation';

export const STREET_FIGHTER_6_COMBO_MAP = {
  '1': 'DOWN-BACK',
  '2': 'DOWN',
  '3': 'DOWN-FORWARD',
  '4': 'BACK',
  '5': 'NEUTRAL',
  '6': 'FORWARD',
  '7': 'UP-BACK',
  '8': 'UP',
  '9': 'UP-FORWARD',
  '623': 'Dragon Punch',
  '236': 'QUARTER CIRCLE FORWARD',
  '41236': 'HALF CIRCLE FORWARD',
  '63214': 'HALF CIRCLE BACK',
  '214': 'QUARTER CIRCLE BACK',
  U: 'UP',
  F: 'FORWARD',
  B: 'BACK',
  ST: 'STANDING',
  S: 'STANDING',
  C: 'CROUCHING',
  CR: 'CROUCHING',
  D: 'DOWN',
  J: 'JUMPING',
  DF: 'DOWN-FORWARD',
  DB: 'DOWN-BACK',
  UF: 'UP-FORWAD',
  PC: 'PUNISH COUNTER',
  UB: 'UP-BACK',
  QCF: 'QUARTER CIRCLE FORWARD',
  QCB: 'QUARTER CIRCLE BACK',
  CH: 'COUNTER-HIT',
  HCF: 'HALF CIRCLE FORWARD',
  HCB: 'HALF CIRCLE BACK',
  P: 'PUNCH',
  K: 'KICK',
  LP: 'LIGHT PUNCH',
  MP: 'MEDIUM PUNCH',
  HP: 'HEAVY PUNCH',
  LK: 'LIGHT KICK',
  MK: 'MEDIUM KICK',
  HK: 'HEAVY KICK',
  XX: 'SPECIAL CANCEL',
  DI: 'DRIVE IMPACT',
  DRC: 'DRIVE RUSH CANCEL',
  DR: 'DRIVE RUSH',
  DP: 'DRAGON PUNCH MOTION',
  LVL1: 'Super Art 1',
  LVL2: 'Super Art 2',
  LVL3: 'Super Art 3',
  '>': '>',
} as const;

export type StreetFighter6MapKey = keyof typeof STREET_FIGHTER_6_COMBO_MAP;

export const STREET_FIGHTER_6_COMBO_MAP_TRANSLATION = new Map<
  string,
  ComboStepTranslation
>([
  [
    '63214',
    {
      imagePath: [
        '/street-fighter-6/moves/forward.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.HCB,
    },
  ],
  [
    '41236',
    {
      imagePath: [
        '/street-fighter-6/moves/back.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/forward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.HCF,
    },
  ],
  ['LVL3', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.LVL3 }],
  ['LVL2', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.LVL2 }],
  ['LVL1', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.LVL1 }],
  ['DRC', { imagePath: '', action: 'DRIVE RUSH CANCEL' }],
  [
    '623',
    {
      imagePath: [
        '/street-fighter-6/moves/forward.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.DP,
    },
  ],
  [
    'HCB',
    {
      imagePath: [
        '/street-fighter-6/moves/forward.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.HCB,
    },
  ],
  [
    'HCF',
    {
      imagePath: [
        '/street-fighter-6/moves/back.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/forward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.HCF,
    },
  ],
  [
    'QCB',
    {
      imagePath: [
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.QCB,
    },
  ],
  [
    '214',
    {
      imagePath: [
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.QCB,
    },
  ],
  [
    'QCF',
    {
      imagePath: [
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/forward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.QCF,
    },
  ],
  [
    '236',
    {
      imagePath: [
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/forward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.QCF,
    },
  ],
  ['DI', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DI }],
  ['DR', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DR }],
  ['XX', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.XX }],
  [
    'MK',
    {
      imagePath: '/street-fighter-6/buttons/mid_kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.MK,
    },
  ],
  [
    'HK',
    {
      imagePath: '/street-fighter-6/buttons/heavy_kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.HK,
    },
  ],
  [
    'LK',
    {
      imagePath: '/street-fighter-6/buttons/light_kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.LK,
    },
  ],
  [
    'HP',
    {
      imagePath: '/street-fighter-6/buttons/heavy_punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.HP,
    },
  ],
  [
    'MP',
    {
      imagePath: '/street-fighter-6/buttons/mid_punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.MP,
    },
  ],
  [
    'LP',
    {
      imagePath: '/street-fighter-6/buttons/light_punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.LP,
    },
  ],
  ['PC', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.PC }],
  [
    'DP',
    {
      imagePath: [
        '/street-fighter-6/moves/forward.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downforward.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.DP,
    },
  ],
  ['CH', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.CH }],
  [
    'UB',
    {
      imagePath: '/street-fighter-6/moves/upbackward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.UB,
    },
  ],
  [
    'UF',
    {
      imagePath: '/street-fighter-6/moves/upforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.UF,
    },
  ],
  [
    'DB',
    {
      imagePath: '/street-fighter-6/moves/downback.png',
      action: STREET_FIGHTER_6_COMBO_MAP.DB,
    },
  ],
  [
    'DF',
    {
      imagePath: '/street-fighter-6/moves/downforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.DF,
    },
  ],
  ['CR', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.CR }],
  ['ST', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.ST }],
  [
    '>',
    {
      imagePath: '',
      actionTitle: 'LINK',
      action: '>',
      style: 'bg-transparent text-3xl font-semibold',
    },
  ],
  ['S', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.ST }],
  [
    '5',
    {
      imagePath: '/street-fighter-6/moves/neutral.png',
      action: STREET_FIGHTER_6_COMBO_MAP[5],
    },
  ],
  [
    'P',
    {
      imagePath: '/street-fighter-6/buttons/punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.P,
    },
  ],
  [
    'K',
    {
      imagePath: '/street-fighter-6/buttons/kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.K,
    },
  ],
  [
    '7',
    {
      imagePath: '/street-fighter-6/moves/upbackward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.UB,
    },
  ],
  [
    '9',
    {
      imagePath: '/street-fighter-6/moves/upforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.UF,
    },
  ],
  [
    '1',
    {
      imagePath: '/street-fighter-6/moves/downback.png',
      action: STREET_FIGHTER_6_COMBO_MAP.DB,
    },
  ],
  [
    '3',
    {
      imagePath: '/street-fighter-6/moves/downforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.DF,
    },
  ],
  [
    'B',
    {
      imagePath: '/street-fighter-6/moves/back.png',
      action: STREET_FIGHTER_6_COMBO_MAP.B,
    },
  ],
  [
    '4',
    {
      imagePath: '/street-fighter-6/moves/back.png',
      action: STREET_FIGHTER_6_COMBO_MAP.B,
    },
  ],
  [
    'D',
    {
      imagePath: '/street-fighter-6/moves/down.png',
      action: STREET_FIGHTER_6_COMBO_MAP.D,
    },
  ],
  [
    '2',
    {
      imagePath: '/street-fighter-6/moves/down.png',
      action: STREET_FIGHTER_6_COMBO_MAP.D,
    },
  ],
  [
    'U',
    {
      imagePath: '/street-fighter-6/moves/up.png',
      action: STREET_FIGHTER_6_COMBO_MAP.U,
    },
  ],
  [
    '8',
    {
      imagePath: '/street-fighter-6/moves/up.png',
      action: STREET_FIGHTER_6_COMBO_MAP.U,
    },
  ],
  [
    'F',
    {
      imagePath: '/street-fighter-6/moves/forward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.F,
    },
  ],
  [
    '6',
    {
      imagePath: '/street-fighter-6/moves/forward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.F,
    },
  ],
  ['J', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.J }],
  ['C', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.C }],
]);
