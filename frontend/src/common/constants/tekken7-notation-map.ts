export const TEKKEN_7_COMBO_MAP = {
  F: 'FORWARD',
  N: 'NEUTRAL',
  D: 'DOWN',
  B: 'BACK',
  DF: 'DOWN-FORWARD',
  DB: 'DOWN-BACK',
  UF: 'UP-FORWAD',
  UB: 'UP-BACK',
  'S!': 'SCREW',
  FC: 'FULL-CROUCH',
  QCF: 'QUARTER CIRCLE FORWARD',
  QCB: 'QUARTER CIRCLE BACK',
  CH: 'COUNTER-HIT',
  HCF: 'HALF CIRCLE FORWARD',
  HCB: 'HALF CIRCLE BACK',
  CD: 'CROUCH DASH',
  SS: 'SIDE STEP',
  SSR: 'SIDE STEP RIGHT',
  SSL: 'SIDE STEP LEFT',
  SWL: 'SIDE WALK LEFT',
  SWR: 'SIDE WALK RIGHT',
  WR: 'WHILE RUNNING',
  WS: 'WHILE STANDING',
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
  RA: 'Rage-Art',
  'W!': 'WALL-SPLAT',
  'WB!': 'WALL-BREAK',
  'F!': 'FLOOR-BREAK',
  'FB!': 'FLOOR-BREAK',
  'BB!': 'BALCONY-BREAK',
  SUGARCOATKAZ: "I'M NOT GONNA SUGARCOAT IT",
} as const;

export type Tekken7MapKey = keyof typeof TEKKEN_7_COMBO_MAP;

export const TEKKEN_7_COMBO_MAP_TRANSLATION = {
  F: { imagePath: '/tekken7/moves/f.svg', action: TEKKEN_7_COMBO_MAP.F },
  N: { imagePath: '/tekken7/moves/n.svg', action: TEKKEN_7_COMBO_MAP.N },
  D: { imagePath: '/tekken7/moves/d.svg', action: TEKKEN_7_COMBO_MAP.D },
  B: { imagePath: '/tekken7/moves/b.svg', action: TEKKEN_7_COMBO_MAP.B },
  DF: { imagePath: '/tekken7/moves/df.svg', action: TEKKEN_7_COMBO_MAP.DF },
  DB: { imagePath: '/tekken7/moves/db.svg', action: TEKKEN_7_COMBO_MAP.DB },
  UF: { imagePath: '/tekken7/moves/uf.svg', action: TEKKEN_7_COMBO_MAP.UF },
  UB: { imagePath: '/tekken7/moves/ub.svg', action: TEKKEN_7_COMBO_MAP.UB },
  'S!': {
    imagePath: '/tekken7/special/screw.png',
    action: TEKKEN_7_COMBO_MAP['S!'],
  },
  FC: { imagePath: '', action: TEKKEN_7_COMBO_MAP.FC },
  QCF: {
    imagePath: [
      '/tekken7/moves/d.svg',
      '/tekken7/moves/df.svg',
      '/tekken7/moves/f.svg',
    ],
    action: TEKKEN_7_COMBO_MAP.QCF,
  },
  QCB: {
    imagePath: [
      '/tekken7/moves/d.svg',
      '/tekken7/moves/db.svg',
      '/tekken7/moves/b.svg',
    ],
    action: TEKKEN_7_COMBO_MAP.QCB,
  },
  CH: { imagePath: '', action: TEKKEN_7_COMBO_MAP.CH },
  HCF: {
    imagePath: [
      '/tekken7/moves/b.svg',
      '/tekken7/moves/db.svg',
      '/tekken7/moves/d.svg',
      '/tekken7/moves/df.svg',
      '/tekken7/moves/f.svg',
    ],
    action: TEKKEN_7_COMBO_MAP.HCF,
  },
  HCB: {
    imagePath: [
      '/tekken7/moves/f.svg',
      '/tekken7/moves/df.svg',
      '/tekken7/moves/d.svg',
      '/tekken7/moves/db.svg',
      '/tekken7/moves/b.svg',
    ],
    action: TEKKEN_7_COMBO_MAP.HCB,
  },
  CD: { imagePath: '', action: TEKKEN_7_COMBO_MAP.CD },
  SS: { imagePath: '', action: TEKKEN_7_COMBO_MAP.SS },
  SSR: { imagePath: '', action: TEKKEN_7_COMBO_MAP.SSR },
  SSL: { imagePath: '', action: TEKKEN_7_COMBO_MAP.SSL },
  SWL: { imagePath: '', action: TEKKEN_7_COMBO_MAP.SWL },
  SWR: { imagePath: '', action: TEKKEN_7_COMBO_MAP.SWR },
  WR: { imagePath: '', action: TEKKEN_7_COMBO_MAP.WR },
  WS: { imagePath: '', action: TEKKEN_7_COMBO_MAP.WS },
  1: { imagePath: '/tekken7/buttons/1.svg', action: TEKKEN_7_COMBO_MAP[1] },
  2: { imagePath: '/tekken7/buttons/2.svg', action: TEKKEN_7_COMBO_MAP[2] },
  3: { imagePath: '/tekken7/buttons/3.svg', action: TEKKEN_7_COMBO_MAP[3] },
  4: { imagePath: '/tekken7/buttons/4.svg', action: TEKKEN_7_COMBO_MAP[4] },
  '1+2': {
    imagePath: '/tekken7/buttons/1+2.svg',
    action: TEKKEN_7_COMBO_MAP['1+2'],
  },
  '1+3': {
    imagePath: '/tekken7/buttons/1+3.svg',
    action: TEKKEN_7_COMBO_MAP['1+3'],
  },
  '1+4': {
    imagePath: '/tekken7/buttons/1+4.svg',
    action: TEKKEN_7_COMBO_MAP['1+4'],
  },
  '2+3': {
    imagePath: '/tekken7/buttons/2+3.svg',
    action: TEKKEN_7_COMBO_MAP['2+3'],
  },
  '2+4': {
    imagePath: '/tekken7/buttons/2+4.svg',
    action: TEKKEN_7_COMBO_MAP['2+4'],
  },
  '3+4': {
    imagePath: '/tekken7/buttons/3+4.svg',
    action: TEKKEN_7_COMBO_MAP['3+4'],
  },
  '2+3+4': {
    imagePath: '/tekken7/buttons/2+3+4.svg',
    action: TEKKEN_7_COMBO_MAP['2+3+4'],
  },
  '1+3+4': {
    imagePath: '/tekken7/buttons/1+3+4.svg',
    action: TEKKEN_7_COMBO_MAP['1+3+4'],
  },
  '1+2+3': {
    imagePath: '/tekken7/buttons/1+2+3.svg',
    action: TEKKEN_7_COMBO_MAP['1+2+3'],
  },
  '1+2+4': {
    imagePath: '/tekken7/buttons/1+2+4.svg',
    action: TEKKEN_7_COMBO_MAP['1+2+4'],
  },
  '1+2+3+4': {
    imagePath: '/tekken7/buttons/1+2+3+4.svg',
    action: TEKKEN_7_COMBO_MAP['1+2+3+4'],
  },
  RA: { imagePath: '', action: TEKKEN_7_COMBO_MAP.RA },
  'WB!': { imagePath: '', action: TEKKEN_7_COMBO_MAP['WB!'] },
  'W!': { imagePath: '', action: TEKKEN_7_COMBO_MAP['W!'] },
  'F!': { imagePath: '', action: TEKKEN_7_COMBO_MAP['F!'] },
  'FB!': { imagePath: '', action: TEKKEN_7_COMBO_MAP['FB!'] },
  'BB!': { imagePath: '', action: TEKKEN_7_COMBO_MAP['BB!'] },
  SUGARCOATKAZ: {
    imagePath: '/tekken7/special/sugar-coat-kaz.png',
    action: TEKKEN_7_COMBO_MAP.SUGARCOATKAZ,
    width: 80,
    height: 80,
  },
};
