import { ComboStepTranslation } from '../types/combo-translation';

export const TEKKEN_8_COMBO_MAP = {
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
  'T!': 'TORNADO',
  'D/F': 'DOWN-FORWARD',
  'D/B': 'DOWN-BACK',
  'U/F': 'UP-FORWAD',
  'U/B': 'UP-BACK',
  dash: 'DASH',
  heat: 'heat',
  HE: 'HEAT-ENGAGE',
  HS: 'HEAT-SMASH',
  HB: 'HEAT-BURST',
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
  '~': 'INPUT IN QUICK SUCCESSION',
  HD: 'HEAT-DASH',
  'WBL!': 'WALL-BLAST',
  'WBO!': 'WALL-BOUND',
  'FBO!': 'FLOOR-BLAST',
  ewgf: 'ELETRIC WIND GOD FIST',
  ewhf: 'ELETRIC WIND HOOK FIST',
  tju: 'TAUNT JET UPPER',
  jfsr: 'JUST FRAME SKY ROCKET',
} as const;

export type Tekken8MapKey = keyof typeof TEKKEN_8_COMBO_MAP;

export const TEKKEN_8_COMBO_MAP_TRANSLATION = new Map<
  string,
  ComboStepTranslation
>([
  [
    'sugarcoatkaz',
    {
      imagePath: '/tekken/tekken8/special/sugar-coat-kaz.png',
      action: TEKKEN_8_COMBO_MAP.sugarcoatkaz,
      width: 110,
    },
  ],
  [
    '1+2+3+4',
    {
      imagePath: '/tekken/tekken8/buttons/1+2+3+4.svg',
      action: TEKKEN_8_COMBO_MAP['1+2+3+4'],
      regex: /1\+2\+3\+4/,
    },
  ],
  [
    '2+3+4',
    {
      imagePath: '/tekken/tekken8/buttons/2+3+4.svg',
      action: TEKKEN_8_COMBO_MAP['2+3+4'],
      regex: /(2\+3\+4)(?![^{]*})/,
    },
  ],
  [
    '1+3+4',
    {
      imagePath: '/tekken/tekken8/buttons/1+3+4.svg',
      action: TEKKEN_8_COMBO_MAP['1+3+4'],
      regex: /(1\+3\+4)(?![^{]*})/,
    },
  ],
  [
    '1+2+3',
    {
      imagePath: '/tekken/tekken8/buttons/1+2+3.svg',
      action: TEKKEN_8_COMBO_MAP['1+2+3'],
      regex: /(1\+2\+3)(?![^{]*})/,
    },
  ],
  [
    '1+2+4',
    {
      imagePath: '/tekken/tekken8/buttons/1+2+4.svg',
      action: TEKKEN_8_COMBO_MAP['1+2+4'],
      regex: /(1\+2\+4)(?![^{]*})/,
    },
  ],
  [
    'EWHF',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.ewgf,
    },
  ],
  [
    'ewhf',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.ewgf,
    },
  ],
  [
    'EWGF',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.ewgf,
    },
  ],
  [
    'ewgf',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.ewgf,
    },
  ],
  [
    'jfsr',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/4.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.jfsr,
    },
  ],
  [
    'JFSR',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/n.svg',
        '/tekken/moves/df.svg',
        '/tekken/tekken8/buttons/4.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.jfsr,
    },
  ],
  [
    'DASH',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.dash,
    },
  ],
  [
    'dash',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.dash,
    },
  ],
  [
    'DASH',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.dash,
    },
  ],
  [
    'HEAT',
    {
      imagePath: '/tekken/tekken8/special/heat.png',
      action: TEKKEN_8_COMBO_MAP.heat,
    },
  ],
  [
    'heat',
    {
      imagePath: '/tekken/tekken8/special/heat.png',
      action: TEKKEN_8_COMBO_MAP.heat,
    },
  ],
  [
    'TJU',
    {
      imagePath: [
        '/tekken/tekken8/buttons/1+3+4.svg',
        '/tekken/moves/f.svg',
        '/tekken/moves/b.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.tju,
    },
  ],
  [
    'tju',
    {
      imagePath: [
        '/tekken/tekken8/buttons/1+3+4.svg',
        '/tekken/moves/f.svg',
        '/tekken/moves/b.svg',
        '/tekken/tekken8/buttons/2.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.tju,
    },
  ],
  [
    'HE',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.HE,
    },
  ],
  [
    'HS',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.HS,
    },
  ],
  [
    'HB',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.HB,
    },
  ],
  [
    '1+2',
    {
      imagePath: '/tekken/tekken8/buttons/1+2.svg',
      action: TEKKEN_8_COMBO_MAP['1+2'],
      regex: /(1\+2)(?![^{]*})/,
    },
  ],
  [
    '1+3',
    {
      imagePath: '/tekken/tekken8/buttons/1+3.svg',
      action: TEKKEN_8_COMBO_MAP['1+3'],
      regex: /(1\+3)(?![^{]*})/,
    },
  ],
  [
    '1+4',
    {
      imagePath: '/tekken/tekken8/buttons/1+4.svg',
      action: TEKKEN_8_COMBO_MAP['1+4'],
      regex: /(1\+4)(?![^{]*})/,
    },
  ],
  [
    '2+3',
    {
      imagePath: '/tekken/tekken8/buttons/2+3.svg',
      action: TEKKEN_8_COMBO_MAP['2+3'],
      regex: /(2\+3)(?![^{]*})/,
    },
  ],
  [
    '2+4',
    {
      imagePath: '/tekken/tekken8/buttons/2+4.svg',
      action: TEKKEN_8_COMBO_MAP['2+4'],
      regex: /(2\+4)(?![^{]*})/,
    },
  ],
  [
    '3+4',
    {
      imagePath: '/tekken/tekken8/buttons/3+4.svg',
      action: TEKKEN_8_COMBO_MAP['3+4'],
      regex: /(3\+4)(?![^{]*})/,
    },
  ],
  [
    'qcf',
    {
      imagePath: [
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/moves/f.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.qcf,
    },
  ],
  [
    'qcb',
    {
      imagePath: [
        '/tekken/moves/d.svg',
        '/tekken/moves/db.svg',
        '/tekken/moves/b.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.qcb,
    },
  ],
  [
    'hcf',
    {
      imagePath: [
        '/tekken/moves/b.svg',
        '/tekken/moves/db.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/df.svg',
        '/tekken/moves/f.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.hcf,
    },
  ],
  [
    'hcb',
    {
      imagePath: [
        '/tekken/moves/f.svg',
        '/tekken/moves/df.svg',
        '/tekken/moves/d.svg',
        '/tekken/moves/db.svg',
        '/tekken/moves/b.svg',
      ],
      action: TEKKEN_8_COMBO_MAP.hcb,
    },
  ],
  ['d/f', { imagePath: '/tekken/moves/df.svg', action: TEKKEN_8_COMBO_MAP.df }],
  ['d/b', { imagePath: '/tekken/moves/db.svg', action: TEKKEN_8_COMBO_MAP.db }],
  ['u/f', { imagePath: '/tekken/moves/uf.svg', action: TEKKEN_8_COMBO_MAP.uf }],
  ['u/b', { imagePath: '/tekken/moves/ub.svg', action: TEKKEN_8_COMBO_MAP.ub }],
  [
    'D/F',
    { imagePath: '/tekken/moves/dfp.svg', action: TEKKEN_8_COMBO_MAP.DF },
  ],
  [
    'D/B',
    { imagePath: '/tekken/moves/dbp.svg', action: TEKKEN_8_COMBO_MAP.DB },
  ],
  [
    'U/F',
    { imagePath: '/tekken/moves/ufp.svg', action: TEKKEN_8_COMBO_MAP.UF },
  ],
  [
    'U/B',
    { imagePath: '/tekken/moves/ubp.svg', action: TEKKEN_8_COMBO_MAP.UB },
  ],
  [
    'T!',
    {
      imagePath: '/tekken/tekken8/special/tornado.png',
      action: TEKKEN_8_COMBO_MAP['T!'],
    },
  ],
  [
    'TORNADO',
    {
      imagePath: '/tekken/tekken8/special/tornado.png',
      action: TEKKEN_8_COMBO_MAP['T!'],
    },
  ],
  [
    'tornado',
    {
      imagePath: '/tekken/tekken8/special/tornado.png',
      action: TEKKEN_8_COMBO_MAP['T!'],
    },
  ],
  ['FC', { imagePath: '', action: TEKKEN_8_COMBO_MAP.fc }],
  ['fc', { imagePath: '', action: TEKKEN_8_COMBO_MAP.fc }],
  ['ssr', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ssr }],
  ['SSR', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ssr }],
  ['ssl', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ssl }],
  ['SSL', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ssl }],
  ['SWL', { imagePath: '', action: TEKKEN_8_COMBO_MAP.swl }],
  ['swl', { imagePath: '', action: TEKKEN_8_COMBO_MAP.swl }],
  ['SWR', { imagePath: '', action: TEKKEN_8_COMBO_MAP.swr }],
  ['swr', { imagePath: '', action: TEKKEN_8_COMBO_MAP.swr }],
  ['FB!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['FB!'] }],
  ['WB!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['WB!'] }],
  ['BB!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['BB!'] }],
  ['WBL!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['WBL!'] }],
  ['WBO!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['WBO!'] }],
  ['FBO!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['FBO!'] }],
  [
    'HD',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.HD,
    },
  ],
  [
    'hd',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP.HD,
    },
  ],
  ['CD', { imagePath: '', action: TEKKEN_8_COMBO_MAP.cd }],
  ['cd', { imagePath: '', action: TEKKEN_8_COMBO_MAP.cd }],
  ['ss', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ss }],
  ['SS', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ss }],
  ['cl', { imagePath: '', action: TEKKEN_8_COMBO_MAP.cl }],
  ['CL', { imagePath: '', action: TEKKEN_8_COMBO_MAP.cl }],
  ['CH', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ch }],
  ['ch', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ch }],
  ['DF', { imagePath: '/tekken/moves/dfp.svg', action: TEKKEN_8_COMBO_MAP.DF }],
  ['DB', { imagePath: '/tekken/moves/dbp.svg', action: TEKKEN_8_COMBO_MAP.DB }],
  ['UF', { imagePath: '/tekken/moves/ufp.svg', action: TEKKEN_8_COMBO_MAP.UF }],
  ['UB', { imagePath: '/tekken/moves/ubp.svg', action: TEKKEN_8_COMBO_MAP.UB }],

  ['RA', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ra }],
  ['ra', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ra }],
  ['W!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['W!'] }],
  ['F!', { imagePath: '', action: TEKKEN_8_COMBO_MAP['F!'] }],
  ['WR', { imagePath: '', action: TEKKEN_8_COMBO_MAP.wr }],
  ['wr', { imagePath: '', action: TEKKEN_8_COMBO_MAP.wr }],
  ['WS', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ws }],
  ['ws', { imagePath: '', action: TEKKEN_8_COMBO_MAP.ws }],
  ['df', { imagePath: '/tekken/moves/df.svg', action: TEKKEN_8_COMBO_MAP.df }],
  ['db', { imagePath: '/tekken/moves/db.svg', action: TEKKEN_8_COMBO_MAP.db }],
  ['uf', { imagePath: '/tekken/moves/uf.svg', action: TEKKEN_8_COMBO_MAP.uf }],
  ['ub', { imagePath: '/tekken/moves/ub.svg', action: TEKKEN_8_COMBO_MAP.ub }],
  ['f', { imagePath: '/tekken/moves/f.svg', action: TEKKEN_8_COMBO_MAP.f }],
  ['d', { imagePath: '/tekken/moves/d.svg', action: TEKKEN_8_COMBO_MAP.d }],
  ['b', { imagePath: '/tekken/moves/b.svg', action: TEKKEN_8_COMBO_MAP.b }],
  ['F', { imagePath: '/tekken/moves/fp.svg', action: TEKKEN_8_COMBO_MAP.F }],
  ['n', { imagePath: '/tekken/moves/n.svg', action: TEKKEN_8_COMBO_MAP.n }],
  ['N', { imagePath: '/tekken/moves/n.svg', action: TEKKEN_8_COMBO_MAP.n }],
  ['D', { imagePath: '/tekken/moves/dp.svg', action: TEKKEN_8_COMBO_MAP.D }],
  ['U', { imagePath: '/tekken/moves/up.svg', action: TEKKEN_8_COMBO_MAP.U }],
  ['u', { imagePath: '/tekken/moves/u.svg', action: TEKKEN_8_COMBO_MAP.u }],
  ['B', { imagePath: '/tekken/moves/bp.svg', action: TEKKEN_8_COMBO_MAP.B }],
  [
    '1',
    {
      imagePath: '/tekken/tekken8/buttons/1.svg',
      action: TEKKEN_8_COMBO_MAP[1],
    },
  ],
  [
    '2',
    {
      imagePath: '/tekken/tekken8/buttons/2.svg',
      action: TEKKEN_8_COMBO_MAP[2],
    },
  ],
  [
    '3',
    {
      imagePath: '/tekken/tekken8/buttons/3.svg',
      action: TEKKEN_8_COMBO_MAP[3],
    },
  ],
  [
    '4',
    {
      imagePath: '/tekken/tekken8/buttons/4.svg',
      action: TEKKEN_8_COMBO_MAP[4],
    },
  ],
  [
    '~',
    {
      imagePath: '',
      action: TEKKEN_8_COMBO_MAP['~'],
      replaceString: '{IN QUICK SUCCESSION},',
    },
  ],
]);
