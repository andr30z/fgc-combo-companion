import { ComboStepTranslation } from '../types/combo-translation';

export const DB_FIGHTERZ_COMBO_MAP = {
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
  '21478': '21478',
  '23698': '23698',
  '89632': '89632',
  '87412': '87412',
  '69874': '69874',
  '47896': '47896',
  '63214': 'HALF CIRCLE BACK',
  '421': '421',
  '214': 'QUARTER CIRCLE BACK',
  '360': '360',
  S: 'SPECIAL',
  H: 'HEAVY',
  A1: 'Z Assist 1',
  A2: 'Z Assist 2',
  L: 'LIGHT',
  M: 'MEDIUM',
  'DJ.': 'DOUBLE JUMP',
  'F.': 'FAR',
  'C.': 'CLOSE',
  CR: 'CROUCHING',
  'J.': 'JUMPING',
  'JC.': 'JUMP CANCEL',
  JC: 'JUMP CANCEL',
  HJ: 'HIGH JUMP',
  'HJ.': 'HIGH JUMP',
  'SJ.': 'SUPER JUMP',
  SJ: 'SUPER JUMP',
  SJC: 'SUPER JUMP CANCEL',
  HJC: 'HIGH JUMP CANCEL',
  WS: 'WALL-SPLAT',
  WB: 'WALL-BREAK',
  DC: 'DASH CANCEL',
  ADC: 'AIR DASH CANCEL',
  PC: 'PUNISH COUNTER',
  QCF: 'QUARTER CIRCLE FORWARD',
  QCB: 'QUARTER CIRCLE BACK',
  CH: 'COUNTER-HIT',
  HCF: 'HALF CIRCLE FORWARD',
  HCB: 'HALF CIRCLE BACK',
  XX: 'CANCEL',
  IAD: 'INSTANT-AIR-DASH',
  IAS: 'INSTANT-AIR-SPECIAL',
  BRC: 'BLUE ROMAN CANCEL',
  RRC: 'RED ROMAN CANCEL',
  RC: 'ROMAN CANCEL',
  PRC: 'PURPLE ROMAN CANCEL',
  YRC: 'YELLOW ROMAN CANCEL',
  AA: 'ANTI-AIR',
  whiff: 'WHIFF',
  dash: 'DASH',
  delay: 'DELAY',
  CL: 'CLEAN-HIT',
  'CL.': 'CLEAN-HIT',
  'DL.': 'DELAY',
  DL: 'DELAY',
  DR: 'DRAGON RUSH',
  SD: 'SUPER DASH',
  '/': 'OR',
  xN: 'xN',
  VANISH: 'VANISH',
  ASSIST: 'ASSIST',
  LAND: 'LAND',
  '▷': 'LAND',
  MICRODASH: 'MICRODASH',
  JUMP: 'JUMP',
  '(N)': '(N)',
} as const;

export type DragonBallFighterZMapKey = keyof typeof DB_FIGHTERZ_COMBO_MAP;

export const DRAGON_BALL_FIGHTERZ_NOTATION_MAP = new Map<
  string,
  ComboStepTranslation
>([
  [
    'xN',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.xN,
      regex: /x(\d+)(?![^{]*})/,
      replaceString: '#{x$1}#',
      uppercaseBeforeTranslation: false,
    },
  ],
  [
    '(N)',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['(N)'],
      regex: /\((\d+)\)(?![^{]*})/,
      replaceString: '#{($1)}#',
      uppercaseBeforeTranslation: false,
    },
  ],
  [
    'LAND',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.LAND,
    },
  ],
  [
    'JUMP',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.JUMP,
    },
  ],
  [
    '▷',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['▷'],
    },
  ],
  [
    'ASSIST',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.ASSIST,
    },
  ],
  [
    'MICRODASH',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.MICRODASH,
    },
  ],
  [
    'VANISH',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.VANISH,
    },
  ],
  [
    '21478',
    {
      imagePath: '/arc-sys-common-assets/moves/21478.png',
      action: DB_FIGHTERZ_COMBO_MAP[21478],
    },
  ],
  [
    '89632',
    {
      imagePath: '/arc-sys-common-assets/moves/89632.png',
      action: DB_FIGHTERZ_COMBO_MAP[89632],
    },
  ],
  [
    '47896',
    {
      imagePath: '/arc-sys-common-assets/moves/47896.png',
      action: DB_FIGHTERZ_COMBO_MAP[47896],
    },
  ],
  [
    '23698',
    {
      imagePath: '/arc-sys-common-assets/moves/23698.png',
      action: DB_FIGHTERZ_COMBO_MAP[23698],
    },
  ],
  [
    '87412',
    {
      imagePath: '/arc-sys-common-assets/moves/87412.png',
      action: DB_FIGHTERZ_COMBO_MAP[87412],
    },
  ],
  [
    '69874',
    {
      imagePath: '/arc-sys-common-assets/moves/69874.png',
      action: DB_FIGHTERZ_COMBO_MAP[69874],
    },
  ],
  [
    '41236',
    {
      imagePath: '/arc-sys-common-assets/moves/41236.png',
      action: DB_FIGHTERZ_COMBO_MAP[41236],
    },
  ],
  [
    '63214',
    {
      imagePath: '/arc-sys-common-assets/moves/63214.png',
      action: DB_FIGHTERZ_COMBO_MAP[63214],
    },
  ],
  [
    'delay',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.delay,
    },
  ],
  [
    'whiff',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.whiff,
    },
  ],
  [
    'dash',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.dash,
    },
  ],
  [
    'ADC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.ADC,
    },
  ],
  [
    'IAS',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.IAS,
    },
  ],
  [
    'HJC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.HJC,
    },
  ],
  [
    '236',
    {
      imagePath: '/arc-sys-common-assets/moves/236.png',
      action: DB_FIGHTERZ_COMBO_MAP[236],
    },
  ],
  [
    'QCF',
    {
      imagePath: '/arc-sys-common-assets/moves/236.png',
      action: DB_FIGHTERZ_COMBO_MAP.QCF,
    },
  ],
  [
    '214',
    {
      imagePath: '/arc-sys-common-assets/moves/214.png',
      action: DB_FIGHTERZ_COMBO_MAP[214],
    },
  ],
  [
    'QCB',
    {
      imagePath: '/arc-sys-common-assets/moves/214.png',
      action: DB_FIGHTERZ_COMBO_MAP.QCB,
    },
  ],

  [
    'HCF',
    {
      imagePath: '/arc-sys-common-assets/moves/41236.png',
      action: DB_FIGHTERZ_COMBO_MAP.HCF,
    },
  ],
  [
    'HCB',
    {
      imagePath: '/arc-sys-common-assets/moves/63214.png',
      action: DB_FIGHTERZ_COMBO_MAP.HCB,
    },
  ],
  [
    '421',
    {
      imagePath: '/arc-sys-common-assets/moves/421.png',
      action: DB_FIGHTERZ_COMBO_MAP[421],
    },
  ],
  [
    '360',
    {
      imagePath: '/arc-sys-common-assets/moves/360.png',
      action: DB_FIGHTERZ_COMBO_MAP[360],
    },
  ],
  [
    '623',
    {
      imagePath: '/arc-sys-common-assets/moves/623.png',
      action: DB_FIGHTERZ_COMBO_MAP[6],
    },
  ],
  [
    'SJC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.SJC,
    },
  ],
  [
    'PRC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.PRC,
    },
  ],
  [
    'RRC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.RRC,
    },
  ],
  [
    'YRC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.YRC,
    },
  ],
  [
    'DL.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['DL.'],
    },
  ],
  [
    'DL',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.DL,
    },
  ],
  [
    'BRC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.BRC,
    },
  ],
  [
    'IAD',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.IAD,
    },
  ],
  [
    'DJ.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['DJ.'],
    },
  ],
  [
    'SJ.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['SJ.'],
    },
  ],
  [
    'JC.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['JC.'],
    },
  ],
  [
    'CL.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['CL.'],
    },
  ],
  [
    'JC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.JC,
    },
  ],
  [
    'WS',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.WS,
    },
  ],
  [
    'CH',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.CH,
    },
  ],
  [
    'SJ',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.SJ,
    },
  ],
  [
    'PC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.PC,
    },
  ],
  [
    'DR',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.DR,
    },
  ],
  [
    'SD',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.SD,
    },
  ],
  [
    'XX',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.XX,
    },
  ],
  [
    'DC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.DC,
    },
  ],
  [
    'WB',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.WB,
    },
  ],
  [
    'AA',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.AA,
    },
  ],
  [
    'RC',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.RC,
    },
  ],
  [
    'CR',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.CR,
    },
  ],
  [
    'CL',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP.CL,
    },
  ],
  [
    'C.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['C.'],
    },
  ],
  [
    'F.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['F.'],
    },
  ],
  [
    'J.',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['J.'],
    },
  ],
  [
    '6',
    {
      imagePath: '/arc-sys-common-assets/moves/6.png',
      action: DB_FIGHTERZ_COMBO_MAP[6],
    },
  ],
  [
    '8',
    {
      imagePath: '/arc-sys-common-assets/moves/8.png',
      action: DB_FIGHTERZ_COMBO_MAP[8],
    },
  ],
  [
    '2',
    {
      imagePath: '/arc-sys-common-assets/moves/2.png',
      action: DB_FIGHTERZ_COMBO_MAP[2],
    },
  ],
  [
    '4',
    {
      imagePath: '/arc-sys-common-assets/moves/4.png',
      action: DB_FIGHTERZ_COMBO_MAP[4],
    },
  ],
  [
    '3',
    {
      imagePath: '/arc-sys-common-assets/moves/3.png',
      action: DB_FIGHTERZ_COMBO_MAP[3],
    },
  ],
  [
    '1',
    {
      imagePath: '/arc-sys-common-assets/moves/1.png',
      action: DB_FIGHTERZ_COMBO_MAP[1],
    },
  ],
  [
    '9',
    {
      imagePath: '/arc-sys-common-assets/moves/9.png',
      action: DB_FIGHTERZ_COMBO_MAP[9],
    },
  ],
  [
    '7',
    {
      imagePath: '/arc-sys-common-assets/moves/7.png',
      action: DB_FIGHTERZ_COMBO_MAP[7],
    },
  ],
  [
    '5',
    {
      imagePath: '/arc-sys-common-assets/moves/5.png',
      action: DB_FIGHTERZ_COMBO_MAP[5],
    },
  ],
  [
    'S',
    {
      imagePath: '/dragon-ball-fighterz/buttons/S.png',
      action: DB_FIGHTERZ_COMBO_MAP.S,
    },
  ],
  [
    'H',
    {
      imagePath: '/dragon-ball-fighterz/buttons/H.png',
      action: DB_FIGHTERZ_COMBO_MAP.H,
    },
  ],
  [
    'M',
    {
      imagePath: '/dragon-ball-fighterz/buttons/M.png',
      action: DB_FIGHTERZ_COMBO_MAP.M,
    },
  ],
  [
    'L',
    {
      imagePath: '/dragon-ball-fighterz/buttons/L.png',
      action: DB_FIGHTERZ_COMBO_MAP.L,
    },
  ],
  [
    'A1',
    {
      imagePath: '/dragon-ball-fighterz/buttons/A1.png',
      action: DB_FIGHTERZ_COMBO_MAP.A1,
    },
  ],
  [
    'A2',
    {
      imagePath: '/dragon-ball-fighterz/buttons/A2.png',
      action: DB_FIGHTERZ_COMBO_MAP.A2,
    },
  ],
  [
    '~',
    {
      imagePath: '',
      action: ' ',
    },
  ],
  [
    ',',
    {
      imagePath: '',
      action: ' ',
    },
  ],
  [
    '>',
    {
      imagePath: '',
      action: ' ',
    },
  ],
  [
    '/',
    {
      imagePath: '',
      action: DB_FIGHTERZ_COMBO_MAP['/'],
    },
  ],
]);
