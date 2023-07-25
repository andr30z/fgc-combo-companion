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
  PP: '2 PUNCH BUTTONS',
  PPP: 'ALL PUNCHES',
  K: 'KICK',
  KK: '2 KICK BUTTONS',
  KKK: 'ALL KICKS',
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
    '5',
    {
      imagePath: '/street-fighter-6/moves/neutral.png',
      action: STREET_FIGHTER_6_COMBO_MAP[5],
    },
  ],
  [
    'S',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.S,
    },
  ],
  [
    'ST',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.S,
    },
  ],
  [
    '>',
    {
      imagePath: '',
      actionTitle: 'LINK',
      action: STREET_FIGHTER_6_COMBO_MAP['>'],
      style: 'bg-transparent text-3xl font-semibold',
    },
  ],
  [
    'CR',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.CR,
    },
  ],
  [
    'C',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.C,
    },
  ],
  [
    'J',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.J,
    },
  ],
  [
    '6',
    {
      imagePath: '/street-fighter-6/moves/forward.png',
      action: STREET_FIGHTER_6_COMBO_MAP[6],
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
    '8',
    {
      imagePath: '/street-fighter-6/moves/up.png',
      action: STREET_FIGHTER_6_COMBO_MAP[8],
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
    '2',
    {
      imagePath: '/street-fighter-6/moves/down.png',
      action: STREET_FIGHTER_6_COMBO_MAP[2],
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
    '4',
    {
      imagePath: '/street-fighter-6/moves/back.png',
      action: STREET_FIGHTER_6_COMBO_MAP[4],
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
    '3',
    {
      imagePath: '/street-fighter-6/moves/downforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP[3],
    },
  ],
  [
    'DF',
    {
      imagePath: '/street-fighter-6/moves/downforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.DF,
    },
  ],
  [
    '1',
    {
      imagePath: '/street-fighter-6/moves/downback.png',
      action: STREET_FIGHTER_6_COMBO_MAP[1],
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
    '9',
    {
      imagePath: '/street-fighter-6/moves/upforward.png',
      action: STREET_FIGHTER_6_COMBO_MAP[9],
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
    '7',
    {
      imagePath: '/street-fighter-6/moves/upbackward.png',
      action: STREET_FIGHTER_6_COMBO_MAP[7],
    },
  ],
  [
    'UB',
    {
      imagePath: '/street-fighter-6/moves/upbackward.png',
      action: STREET_FIGHTER_6_COMBO_MAP.UB,
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
      action: STREET_FIGHTER_6_COMBO_MAP[236],
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
    '214',
    {
      imagePath: [
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP[214],
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
  ['CH', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.CH }],
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
      action: STREET_FIGHTER_6_COMBO_MAP[41236],
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
    '63214',
    {
      imagePath: [
        '/street-fighter-6/moves/forward.png',
        '/street-fighter-6/moves/downforward.png',
        '/street-fighter-6/moves/down.png',
        '/street-fighter-6/moves/downback.png',
        '/street-fighter-6/moves/back.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP[63214],
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
    'K',
    {
      imagePath: '/street-fighter-6/buttons/kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.K,
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
  [
    'PC',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.PC,
    },
  ],
  ['PPP', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.PPP }],
  [
    'PP',
    {
      imagePath: [
        '/street-fighter-6/buttons/punch.png',
        '/street-fighter-6/buttons/punch.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.PP,
    },
  ],
  ['KKK', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.KKK }],
  [
    'KK',
    {
      imagePath: [
        '/street-fighter-6/buttons/kick.png',
        '/street-fighter-6/buttons/kick.png',
      ],
      action: STREET_FIGHTER_6_COMBO_MAP.KK,
    },
  ],
  [
    'LP',
    {
      imagePath: '/street-fighter-6/buttons/light_punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.LP,
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
    'HP',
    {
      imagePath: '/street-fighter-6/buttons/heavy_punch.png',
      action: STREET_FIGHTER_6_COMBO_MAP.HP,
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
    'HK',
    {
      imagePath: '/street-fighter-6/buttons/heavy_kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.HK,
    },
  ],
  [
    'MK',
    {
      imagePath: '/street-fighter-6/buttons/mid_kick.png',
      action: STREET_FIGHTER_6_COMBO_MAP.MK,
    },
  ],
  ['XX', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.XX }],
  ['DRC', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DRC }],
  ['DR', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DR }],
  ['DI', { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DI }],
  [
    'LVL1',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.LVL1,
    },
  ],
  [
    'LVL2',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.LVL2,
    },
  ],
  [
    'LVL3',
    {
      imagePath: '',
      action: STREET_FIGHTER_6_COMBO_MAP.LVL3,
    },
  ],
]);
