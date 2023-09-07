import { ComboStepTranslation } from '../types/combo-translation';

export const TEKKEN_7_COMBO_MAP = {
  f: 'FORWARD',
  d: 'DOWN',
  b: 'BACK',
  u: 'UP',
  df: 'DOWN-FORWARD',
  db: 'DOWN-BACK',
  uf: 'UP-FORWAD',
  ub: 'UP-BACK',
  n: 'NEUTRAL',
  F: 'FORWARD',
  D: 'DOWN',
  B: 'BACK',
  U: 'UP',
  DF: 'DOWN-FORWARD',
  DB: 'DOWN-BACK',
  UF: 'UP-FORWAD',
  UB: 'UP-BACK',
  'd/f': 'DOWN-FORWARD',
  'd/b': 'DOWN-BACK',
  'u/f': 'UP-FORWAD',
  'u/b': 'UP-BACK',
  'S!': 'SCREW',
  'D/F': 'DOWN-FORWARD',
  'D/B': 'DOWN-BACK',
  'U/F': 'UP-FORWAD',
  'U/B': 'UP-BACK',
  dash: 'DASH',
  fc: 'FULL-CROUCH',
  qcf: 'QUARTER CIRCLE FORWARD',
  qcb: 'QUARTER CIRCLE BACK',
  ch: 'COUNTER-HIT',
  hcf: 'HALF CIRCLE FORWARD',
  hcb: 'HALF CIRCLE BACK',
  cd: 'CROUCH DASH',
  ss: 'SIDE STEP',
  ssr: 'SIDE STEP RIGHT',
  ssl: 'SIDE STEP LEFT',
  swl: 'SIDE WALK LEFT',
  swr: 'SIDE WALK RIGHT',
  wr: 'WHILE RUNNING',
  ws: 'WHILE STANDING',
  '2': 'TRIANGLE',
  '1': 'SQUARE',
  '3': 'CROSS',
  '4': 'CIRCLE',
  '1+2': 'SQUARE+TRIANGLE',
  '1+3': 'SQUARE+CROSS',
  '1+4': 'SQUARE+CIRCLE',
  '2+3': 'TRIANGLE+CROSS',
  '2+4': 'TRIANGLE+CIRCLE',
  '3+4': 'CROSS+CIRCLE',
  '1+2+3': 'SQUARE+TRIANGLE+CROSS',
  '1+2+4': 'SQUARE+TRIANGLE+CIRCLE',
  '2+3+4': 'TRIANGLE+CROSS+CIRCLE',
  '1+3+4': 'SQUARE+CROSS+CIRCLE',
  '1+2+3+4': 'KI-CHARGE',
  ra: 'Rage-Art',
  'W!': 'WALL-SPLAT',
  'WB!': 'WALL-BREAK',
  'F!': 'FLOOR-BREAK',
  'FB!': 'FLOOR-BREAK',
  'BB!': 'BALCONY-BREAK',
  sugarcoatkaz: "I'M NOT GONNA SUGARCOAT IT",
  cl: 'CLEAN HIT',
} as const;

export type Tekken7MapKey = keyof typeof TEKKEN_7_COMBO_MAP;

export const TEKKEN_7_COMBO_MAP_TRANSLATION = new Map<
  string,
  ComboStepTranslation
>([
  [
    'sugarcoatkaz',
    {
      imagePath: '/tekken7/special/sugar-coat-kaz.png',
      action: TEKKEN_7_COMBO_MAP.sugarcoatkaz,
      width: 80,
      height: 80,
    },
  ],
  [
    '1+2+3+4',
    {
      imagePath: '/tekken7/buttons/1+2+3+4.svg',
      action: TEKKEN_7_COMBO_MAP['1+2+3+4'],
      regex: /1\+2\+3\+4/,
    },
  ],
  [
    '2+3+4',
    {
      imagePath: '/tekken7/buttons/2+3+4.svg',
      action: TEKKEN_7_COMBO_MAP['2+3+4'],
      regex: /(2\+3\+4)(?![^{]*})/,
    },
  ],
  [
    '1+3+4',
    {
      imagePath: '/tekken7/buttons/1+3+4.svg',
      action: TEKKEN_7_COMBO_MAP['1+3+4'],
      regex: /(1\+3\+4)(?![^{]*})/,
    },
  ],
  [
    '1+2+3',
    {
      imagePath: '/tekken7/buttons/1+2+3.svg',
      action: TEKKEN_7_COMBO_MAP['1+2+3'],
      regex: /(1\+2\+3)(?![^{]*})/,
    },
  ],
  [
    '1+2+4',
    {
      imagePath: '/tekken7/buttons/1+2+4.svg',
      action: TEKKEN_7_COMBO_MAP['1+2+4'],
      regex: /(1\+2\+4)(?![^{]*})/,
    },
  ],
  [
    'DASH',
    {
      imagePath: '',
      action: TEKKEN_7_COMBO_MAP.dash,
    },
  ],
  [
    'dash',
    {
      imagePath: '',
      action: TEKKEN_7_COMBO_MAP.dash,
    },
  ],
  [
    '1+2',
    {
      imagePath: '/tekken7/buttons/1+2.svg',
      action: TEKKEN_7_COMBO_MAP['1+2'],
      regex: /(1\+2)(?![^{]*})/,
    },
  ],
  [
    '1+3',
    {
      imagePath: '/tekken7/buttons/1+3.svg',
      action: TEKKEN_7_COMBO_MAP['1+3'],
      regex: /(1\+3)(?![^{]*})/,
    },
  ],
  [
    '1+4',
    {
      imagePath: '/tekken7/buttons/1+4.svg',
      action: TEKKEN_7_COMBO_MAP['1+4'],
      regex: /(1\+4)(?![^{]*})/,
    },
  ],
  [
    '2+3',
    {
      imagePath: '/tekken7/buttons/2+3.svg',
      action: TEKKEN_7_COMBO_MAP['2+3'],
      regex: /(2\+3)(?![^{]*})/,
    },
  ],
  [
    '2+4',
    {
      imagePath: '/tekken7/buttons/2+4.svg',
      action: TEKKEN_7_COMBO_MAP['2+4'],
      regex: /(2\+4)(?![^{]*})/,
    },
  ],
  [
    '3+4',
    {
      imagePath: '/tekken7/buttons/3+4.svg',
      action: TEKKEN_7_COMBO_MAP['3+4'],
      regex: /(3\+4)(?![^{]*})/,
    },
  ],
  [
    'qcf',
    {
      imagePath: [
        '/tekken7/moves/d.svg',
        '/tekken7/moves/df.svg',
        '/tekken7/moves/f.svg',
      ],
      action: TEKKEN_7_COMBO_MAP.qcf,
    },
  ],
  [
    'qcb',
    {
      imagePath: [
        '/tekken7/moves/d.svg',
        '/tekken7/moves/db.svg',
        '/tekken7/moves/b.svg',
      ],
      action: TEKKEN_7_COMBO_MAP.qcb,
    },
  ],
  [
    'hcf',
    {
      imagePath: [
        '/tekken7/moves/b.svg',
        '/tekken7/moves/db.svg',
        '/tekken7/moves/d.svg',
        '/tekken7/moves/df.svg',
        '/tekken7/moves/f.svg',
      ],
      action: TEKKEN_7_COMBO_MAP.hcf,
    },
  ],
  [
    'hcb',
    {
      imagePath: [
        '/tekken7/moves/f.svg',
        '/tekken7/moves/df.svg',
        '/tekken7/moves/d.svg',
        '/tekken7/moves/db.svg',
        '/tekken7/moves/b.svg',
      ],
      action: TEKKEN_7_COMBO_MAP.hcb,
    },
  ],
  [
    'd/f',
    { imagePath: '/tekken7/moves/df.svg', action: TEKKEN_7_COMBO_MAP.df },
  ],
  [
    'd/b',
    { imagePath: '/tekken7/moves/db.svg', action: TEKKEN_7_COMBO_MAP.db },
  ],
  [
    'u/f',
    { imagePath: '/tekken7/moves/uf.svg', action: TEKKEN_7_COMBO_MAP.uf },
  ],
  [
    'u/b',
    { imagePath: '/tekken7/moves/ub.svg', action: TEKKEN_7_COMBO_MAP.ub },
  ],
  [
    'D/F',
    { imagePath: '/tekken7/moves/dfp.svg', action: TEKKEN_7_COMBO_MAP.DF },
  ],
  [
    'D/B',
    { imagePath: '/tekken7/moves/dbp.svg', action: TEKKEN_7_COMBO_MAP.DB },
  ],
  [
    'U/F',
    { imagePath: '/tekken7/moves/ufp.svg', action: TEKKEN_7_COMBO_MAP.UF },
  ],
  [
    'U/B',
    { imagePath: '/tekken7/moves/ubp.svg', action: TEKKEN_7_COMBO_MAP.UB },
  ],
  [
    'S!',
    {
      imagePath: '/tekken7/special/screw.png',
      action: TEKKEN_7_COMBO_MAP['S!'],
    },
  ],
  ['FC', { imagePath: '', action: TEKKEN_7_COMBO_MAP.fc }],
  ['fc', { imagePath: '', action: TEKKEN_7_COMBO_MAP.fc }],
  ['ssr', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ssr }],
  ['SSR', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ssr }],
  ['ssl', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ssl }],
  ['SSL', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ssl }],
  ['SWL', { imagePath: '', action: TEKKEN_7_COMBO_MAP.swl }],
  ['swl', { imagePath: '', action: TEKKEN_7_COMBO_MAP.swl }],
  ['SWR', { imagePath: '', action: TEKKEN_7_COMBO_MAP.swr }],
  ['swr', { imagePath: '', action: TEKKEN_7_COMBO_MAP.swr }],
  ['FB!', { imagePath: '', action: TEKKEN_7_COMBO_MAP['FB!'] }],
  ['WB!', { imagePath: '', action: TEKKEN_7_COMBO_MAP['WB!'] }],
  ['BB!', { imagePath: '', action: TEKKEN_7_COMBO_MAP['BB!'] }],
  ['CD', { imagePath: '', action: TEKKEN_7_COMBO_MAP.cd }],
  ['cd', { imagePath: '', action: TEKKEN_7_COMBO_MAP.cd }],
  ['ss', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ss }],
  ['SS', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ss }],
  ['cl', { imagePath: '', action: TEKKEN_7_COMBO_MAP.cl }],
  ['CL', { imagePath: '', action: TEKKEN_7_COMBO_MAP.cl }],
  ['CH', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ch }],
  ['ch', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ch }],
  [
    'DF',
    { imagePath: '/tekken7/moves/dfp.svg', action: TEKKEN_7_COMBO_MAP.DF },
  ],
  [
    'DB',
    { imagePath: '/tekken7/moves/dbp.svg', action: TEKKEN_7_COMBO_MAP.DB },
  ],
  [
    'UF',
    { imagePath: '/tekken7/moves/ufp.svg', action: TEKKEN_7_COMBO_MAP.UF },
  ],
  [
    'UB',
    { imagePath: '/tekken7/moves/ubp.svg', action: TEKKEN_7_COMBO_MAP.UB },
  ],

  ['RA', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ra }],
  ['ra', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ra }],
  ['W!', { imagePath: '', action: TEKKEN_7_COMBO_MAP['W!'] }],
  ['F!', { imagePath: '', action: TEKKEN_7_COMBO_MAP['F!'] }],
  ['WR', { imagePath: '', action: TEKKEN_7_COMBO_MAP.wr }],
  ['wr', { imagePath: '', action: TEKKEN_7_COMBO_MAP.wr }],
  ['WS', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ws }],
  ['ws', { imagePath: '', action: TEKKEN_7_COMBO_MAP.ws }],
  ['df', { imagePath: '/tekken7/moves/df.svg', action: TEKKEN_7_COMBO_MAP.df }],
  ['db', { imagePath: '/tekken7/moves/db.svg', action: TEKKEN_7_COMBO_MAP.db }],
  ['uf', { imagePath: '/tekken7/moves/uf.svg', action: TEKKEN_7_COMBO_MAP.uf }],
  ['ub', { imagePath: '/tekken7/moves/ub.svg', action: TEKKEN_7_COMBO_MAP.ub }],
  ['f', { imagePath: '/tekken7/moves/f.svg', action: TEKKEN_7_COMBO_MAP.f }],
  ['d', { imagePath: '/tekken7/moves/d.svg', action: TEKKEN_7_COMBO_MAP.d }],
  ['b', { imagePath: '/tekken7/moves/b.svg', action: TEKKEN_7_COMBO_MAP.b }],
  ['F', { imagePath: '/tekken7/moves/fp.svg', action: TEKKEN_7_COMBO_MAP.F }],
  ['n', { imagePath: '/tekken7/moves/n.svg', action: TEKKEN_7_COMBO_MAP.n }],
  ['D', { imagePath: '/tekken7/moves/dp.svg', action: TEKKEN_7_COMBO_MAP.D }],
  ['U', { imagePath: '/tekken7/moves/up.svg', action: TEKKEN_7_COMBO_MAP.U }],
  ['u', { imagePath: '/tekken7/moves/u.svg', action: TEKKEN_7_COMBO_MAP.u }],
  ['B', { imagePath: '/tekken7/moves/bp.svg', action: TEKKEN_7_COMBO_MAP.B }],
  [
    '1',
    {
      imagePath: '/tekken7/buttons/1.svg',
      action: TEKKEN_7_COMBO_MAP[1],
    },
  ],
  [
    '2',
    {
      imagePath: '/tekken7/buttons/2.svg',
      action: TEKKEN_7_COMBO_MAP[2],
    },
  ],
  [
    '3',
    {
      imagePath: '/tekken7/buttons/3.svg',
      action: TEKKEN_7_COMBO_MAP[3],
    },
  ],
  [
    '4',
    {
      imagePath: '/tekken7/buttons/4.svg',
      action: TEKKEN_7_COMBO_MAP[4],
    },
  ],
]);
