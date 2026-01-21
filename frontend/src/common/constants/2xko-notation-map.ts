import { ComboStepTranslation } from '../types/combo-translation';

export const TWOXKO_COMBO_MAP = {
  // Directional inputs - numpad notation
  '1': 'DOWN-BACK',
  '2': 'DOWN',
  '3': 'DOWN-FORWARD',
  '4': 'BACK',
  '5': 'NEUTRAL',
  '6': 'FORWARD',
  '7': 'UP-BACK',
  '8': 'UP',
  '9': 'UP-FORWARD',

  // Directional abbreviations
  f: 'FORWARD',
  d: 'DOWN',
  b: 'BACK',
  u: 'UP',
  df: 'DOWN-FORWARD',
  db: 'DOWN-BACK',
  uf: 'UP-FORWARD',
  ub: 'UP-BACK',
  n: 'NEUTRAL',
  F: 'FORWARD',
  D: 'DOWN',
  B: 'BACK',
  U: 'UP',
  DF: 'DOWN-FORWARD',
  DB: 'DOWN-BACK',
  UF: 'UP-FORWARD',
  UB: 'UP-BACK',

  // Quarter and half circles
  qcf: 'QUARTER CIRCLE FORWARD',
  qcb: 'QUARTER CIRCLE BACK',
  hcf: 'HALF CIRCLE FORWARD',
  hcb: 'HALF CIRCLE BACK',
  '236': 'QUARTER CIRCLE FORWARD',
  '214': 'QUARTER CIRCLE BACK',
  '41236': 'HALF CIRCLE FORWARD',
  '63214': 'HALF CIRCLE BACK',

  // Attack buttons
  L: 'LIGHT',
  M: 'MEDIUM',
  H: 'HEAVY',

  // Special buttons
  S1: 'SPECIAL 1',
  S2: 'SPECIAL 2',

  // Tag button
  T: 'TAG',

  // Universal mechanics
  launcher: 'LAUNCHER',
  land: 'LAND',
  'df+H': 'LAUNCHER',
  'anti-air': 'ANTI-AIR',
  'd+H': 'ANTI-AIR',
  parry: 'PARRY',
  crossup: 'CROSS-UP',
  delay: 'DELAY',

  // Dynamic Save (Combo Breaker)
  'dynamic save': 'DYNAMIC SAVE',
  breaker: 'COMBO BREAKER',

  // Ultimates
  lvl1: 'LEVEL 1 ULTIMATE',
  lvl2: 'LEVEL 2 ULTIMATE',
  ult1: 'LEVEL 1 ULTIMATE',
  ult2: 'LEVEL 2 ULTIMATE',

  // Other mechanics
  dash: 'DASH',
  j: 'JUMP',
  'j.': 'JUMPING',
  air: 'AIRBORNE',
  ground: 'GROUNDED',
  ch: 'COUNTER-HIT',

  // Separators
  '>': '>',
  ',': ',',
} as const;

export type TwoXKOMapKey = keyof typeof TWOXKO_COMBO_MAP;

export const TWOXKO_COMBO_MAP_TRANSLATION = new Map<
  string,
  ComboStepTranslation
>([
  // Universal mechanics
  ['dynamic save', { imagePath: '', action: TWOXKO_COMBO_MAP['dynamic save'] }],
  ['breaker', { imagePath: '', action: TWOXKO_COMBO_MAP.breaker }],
  ['land', { imagePath: '', action: TWOXKO_COMBO_MAP.land }],
  ['LAUNCHER', { imagePath: '', action: TWOXKO_COMBO_MAP.launcher }],
  ['launcher', { imagePath: '', action: TWOXKO_COMBO_MAP.launcher }],
  ['PARRY', { imagePath: '', action: TWOXKO_COMBO_MAP.parry }],
  ['parry', { imagePath: '', action: TWOXKO_COMBO_MAP.parry }],
  ['LVL1', { imagePath: '', action: TWOXKO_COMBO_MAP.lvl1 }],
  ['lvl1', { imagePath: '', action: TWOXKO_COMBO_MAP.lvl1 }],
  ['ULT1', { imagePath: '', action: TWOXKO_COMBO_MAP.ult1 }],
  ['ult1', { imagePath: '', action: TWOXKO_COMBO_MAP.ult1 }],
  ['LVL2', { imagePath: '', action: TWOXKO_COMBO_MAP.lvl2 }],
  ['lvl2', { imagePath: '', action: TWOXKO_COMBO_MAP.lvl2 }],
  ['ULT2', { imagePath: '', action: TWOXKO_COMBO_MAP.ult2 }],
  ['ult2', { imagePath: '', action: TWOXKO_COMBO_MAP.ult2 }],
  ['DASH', { imagePath: '', action: TWOXKO_COMBO_MAP.dash }],
  ['dash', { imagePath: '', action: TWOXKO_COMBO_MAP.dash }],
  ['CH', { imagePath: '', action: TWOXKO_COMBO_MAP.ch }],
  ['ch', { imagePath: '', action: TWOXKO_COMBO_MAP.ch }],
  ['delay', { imagePath: '', action: TWOXKO_COMBO_MAP.delay }],
  ['DELAY', { imagePath: '', action: TWOXKO_COMBO_MAP.delay }],
  [
    '(delay)',
    {
      imagePath: '',
      action: TWOXKO_COMBO_MAP.delay,
    },
  ],
  [
    '(DELAY)',
    {
      imagePath: '',
      action: TWOXKO_COMBO_MAP.delay,
    },
  ],

  // Quarter circles
  [
    '236',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcf,
      width: 30,
    },
  ],
  [
    'QCF',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcf,
      width: 30,
    },
  ],
  [
    'qcf',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcf,
      width: 30,
    },
  ],
  [
    '214',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcb,
      width: 30,
    },
  ],
  [
    'QCB',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcb,
      width: 30,
    },
  ],
  [
    'qcb',
    {
      imagePath: [
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.qcb,
      width: 30,
    },
  ],

  // Half circles
  [
    '41236',
    {
      imagePath: [
        '/2xko/moves/4.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcf,
      width: 30,
    },
  ],
  [
    'HCF',
    {
      imagePath: [
        '/2xko/moves/4.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcf,
      width: 30,
    },
  ],
  [
    'hcf',
    {
      imagePath: [
        '/2xko/moves/4.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/6.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcf,
      width: 30,
    },
  ],
  [
    '63214',
    {
      imagePath: [
        '/2xko/moves/6.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcb,
      width: 30,
    },
  ],
  [
    'HCB',
    {
      imagePath: [
        '/2xko/moves/6.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcb,
      width: 30,
    },
  ],
  [
    'hcb',
    {
      imagePath: [
        '/2xko/moves/6.svg',
        '/2xko/moves/3.svg',
        '/2xko/moves/2.svg',
        '/2xko/moves/1.svg',
        '/2xko/moves/4.svg',
      ],
      action: TWOXKO_COMBO_MAP.hcb,
      width: 30,
    },
  ],

  // Attack buttons
  ['L', { imagePath: '/2xko/buttons/light.svg', action: TWOXKO_COMBO_MAP.L }],
  ['M', { imagePath: '/2xko/buttons/medium.svg', action: TWOXKO_COMBO_MAP.M }],
  ['H', { imagePath: '/2xko/buttons/heavy.svg', action: TWOXKO_COMBO_MAP.H }],

  // Special buttons
  [
    'S1',
    { imagePath: '/2xko/buttons/special1.svg', action: TWOXKO_COMBO_MAP.S1 },
  ],
  [
    'S2',
    { imagePath: '/2xko/buttons/special2.svg', action: TWOXKO_COMBO_MAP.S2 },
  ],

  // Tag button
  ['T', { imagePath: '/2xko/buttons/tag.svg', action: TWOXKO_COMBO_MAP.T }],

  // Directional inputs
  [
    'DF',
    { imagePath: '/2xko/moves/3.svg', action: TWOXKO_COMBO_MAP.DF, width: 30 },
  ],
  [
    'df',
    { imagePath: '/2xko/moves/3.svg', action: TWOXKO_COMBO_MAP.df, width: 30 },
  ],
  [
    'DB',
    { imagePath: '/2xko/moves/1.svg', action: TWOXKO_COMBO_MAP.DB, width: 30 },
  ],
  [
    'db',
    { imagePath: '/2xko/moves/1.svg', action: TWOXKO_COMBO_MAP.db, width: 30 },
  ],
  [
    'UF',
    { imagePath: '/2xko/moves/9.svg', action: TWOXKO_COMBO_MAP.UF, width: 30 },
  ],
  [
    'uf',
    { imagePath: '/2xko/moves/9.svg', action: TWOXKO_COMBO_MAP.uf, width: 30 },
  ],
  [
    'UB',
    { imagePath: '/2xko/moves/7.svg', action: TWOXKO_COMBO_MAP.UB, width: 30 },
  ],
  [
    'ub',
    { imagePath: '/2xko/moves/7.svg', action: TWOXKO_COMBO_MAP.ub, width: 30 },
  ],
  [
    'F',
    { imagePath: '/2xko/moves/6.svg', action: TWOXKO_COMBO_MAP.F, width: 30 },
  ],
  [
    'f',
    { imagePath: '/2xko/moves/6.svg', action: TWOXKO_COMBO_MAP.f, width: 30 },
  ],
  [
    'B',
    { imagePath: '/2xko/moves/4.svg', action: TWOXKO_COMBO_MAP.B, width: 30 },
  ],
  [
    'b',
    { imagePath: '/2xko/moves/4.svg', action: TWOXKO_COMBO_MAP.b, width: 30 },
  ],
  [
    'D',
    { imagePath: '/2xko/moves/2.svg', action: TWOXKO_COMBO_MAP.D, width: 30 },
  ],
  [
    'd',
    { imagePath: '/2xko/moves/2.svg', action: TWOXKO_COMBO_MAP.d, width: 30 },
  ],
  [
    'U',
    { imagePath: '/2xko/moves/8.svg', action: TWOXKO_COMBO_MAP.U, width: 30 },
  ],
  [
    'u',
    { imagePath: '/2xko/moves/8.svg', action: TWOXKO_COMBO_MAP.u, width: 30 },
  ],
  [
    'N',
    { imagePath: '/2xko/moves/5.svg', action: TWOXKO_COMBO_MAP.n, width: 30 },
  ],
  [
    'n',
    { imagePath: '/2xko/moves/5.svg', action: TWOXKO_COMBO_MAP.n, width: 30 },
  ],

  // Numpad notation
  [
    '1',
    {
      imagePath: '/2xko/moves/1.svg',
      action: TWOXKO_COMBO_MAP['1'],
      width: 30,
    },
  ],
  [
    '2',
    {
      imagePath: '/2xko/moves/2.svg',
      action: TWOXKO_COMBO_MAP['2'],
      width: 30,
    },
  ],
  [
    '3',
    {
      imagePath: '/2xko/moves/3.svg',
      action: TWOXKO_COMBO_MAP['3'],
      width: 30,
    },
  ],
  [
    '4',
    {
      imagePath: '/2xko/moves/4.svg',
      action: TWOXKO_COMBO_MAP['4'],
      width: 30,
    },
  ],
  [
    '5',
    {
      imagePath: '/2xko/moves/5.svg',
      action: TWOXKO_COMBO_MAP['5'],
      width: 30,
    },
  ],
  [
    '6',
    {
      imagePath: '/2xko/moves/6.svg',
      action: TWOXKO_COMBO_MAP['6'],
      width: 30,
    },
  ],
  [
    '7',
    {
      imagePath: '/2xko/moves/7.svg',
      action: TWOXKO_COMBO_MAP['7'],
      width: 30,
    },
  ],
  [
    '8',
    {
      imagePath: '/2xko/moves/8.svg',
      action: TWOXKO_COMBO_MAP['8'],
      width: 30,
    },
  ],
  [
    '9',
    {
      imagePath: '/2xko/moves/9.svg',
      action: TWOXKO_COMBO_MAP['9'],
      width: 30,
    },
  ],

  // Jump prefix
  ['J', { imagePath: '', action: TWOXKO_COMBO_MAP.j }],
  ['j', { imagePath: '', action: TWOXKO_COMBO_MAP.j }],
  ['J.', { imagePath: '', action: TWOXKO_COMBO_MAP['j.'] }],
  ['j.', { imagePath: '', action: TWOXKO_COMBO_MAP['j.'] }],

  // Separator
  [
    '>',
    {
      imagePath: '/2xko/helpers/then.svg',
      actionTitle: 'LINK',
      action: '>',
    },
  ],
  [
    '+',
    {
      imagePath: '/2xko/helpers/plus.svg',
      actionTitle: 'PLUS',
      action: '+',
      regex: /\+/,
    },
  ],
]);
