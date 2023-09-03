import { ComboStepTranslation } from '../types/combo-translation';

export const GUILTY_GEAR_STRIVE_COMBO_MAP = {
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
  S: 'SLASH',
  H: 'HEAVY-SLASH',
  P: 'PUNCH',
  K: 'KICK',
  D: 'DUST',
  'DJ.': 'DOUBLE JUMP',
  'F.': 'FAR',
  'C.': 'CLOSE',
  CR: 'CROUCHING',
  'J.': 'JUMPING',
  'JC.': 'JUMP CANCEL',
  JC: 'JUMP CANCEL',
  'SJ.': 'SUPER JUMP',
  SJ: 'SUPER JUMP',
  SJC: 'SUPER JUMP CANCEL',
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
  BRC: 'BLUE ROMAN CANCEL',
  RRC: 'RED ROMAN CANCEL',
  RC: 'ROMAN CANCEL',
  PRC: 'PURPLE ROMAN CANCEL',
  YRC: 'YELLOW ROMAN CANCEL',
  AA: 'ANTI AIR',
  whiff: 'WHIFF',
  dash: 'DASH',
  delay: 'DELAY',
  CL: 'CLEAN-HIT',
  'CL.': 'CLEAN-HIT',
  'DL.': 'DELAY',
  DL: 'DELAY',
  '/': 'OR',
  xN: 'xN',
  LAND: 'LAND',
  '▷': 'LAND',
  '(N)': '(N)',
} as const;

export type GuiltyGearStriveMapKey = keyof typeof GUILTY_GEAR_STRIVE_COMBO_MAP;

export const GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP = new Map<
  string,
  ComboStepTranslation
>([
  [
    'xN',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.xN,
      regex: /x(\d+)(?![^{]*})/,
      replaceString: '#{x$1}#',
      uppercaseBeforeTranslation: false,
    },
  ],
  [
    '(N)',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['(N)'],
      regex: /\((\d+)\)(?![^{]*})/,
      replaceString: '#{($1)}#',
      uppercaseBeforeTranslation: false,
    },
  ],
  [
    'LAND',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.LAND,
    },
  ],
  [
    '▷',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['▷'],
    },
  ],
  [
    '21478',
    {
      imagePath: '/arc-sys-common-assets/moves/21478.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[21478],
    },
  ],
  [
    '89632',
    {
      imagePath: '/arc-sys-common-assets/moves/89632.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[89632],
    },
  ],
  [
    '47896',
    {
      imagePath: '/arc-sys-common-assets/moves/47896.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[47896],
    },
  ],
  [
    '23698',
    {
      imagePath: '/arc-sys-common-assets/moves/23698.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[23698],
    },
  ],
  [
    '87412',
    {
      imagePath: '/arc-sys-common-assets/moves/87412.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[87412],
    },
  ],
  [
    '69874',
    {
      imagePath: '/arc-sys-common-assets/moves/69874.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[69874],
    },
  ],
  [
    '41236',
    {
      imagePath: '/arc-sys-common-assets/moves/41236.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[41236],
    },
  ],
  [
    '63214',
    {
      imagePath: '/arc-sys-common-assets/moves/63214.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[63214],
    },
  ],
  [
    'delay',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.delay,
    },
  ],
  [
    'whiff',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.whiff,
    },
  ],
  [
    'dash',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.dash,
    },
  ],
  [
    'ADC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.ADC,
    },
  ],
  [
    '236',
    {
      imagePath: '/arc-sys-common-assets/moves/236.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[236],
    },
  ],
  [
    'QCF',
    {
      imagePath: '/arc-sys-common-assets/moves/236.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.QCF,
    },
  ],
  [
    '214',
    {
      imagePath: '/arc-sys-common-assets/moves/214.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[214],
    },
  ],
  [
    'QCB',
    {
      imagePath: '/arc-sys-common-assets/moves/214.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.QCB,
    },
  ],

  [
    'HCF',
    {
      imagePath: '/arc-sys-common-assets/moves/41236.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.HCF,
    },
  ],
  [
    'HCB',
    {
      imagePath: '/arc-sys-common-assets/moves/63214.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.HCB,
    },
  ],
  [
    '421',
    {
      imagePath: '/arc-sys-common-assets/moves/421.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[421],
    },
  ],
  [
    '360',
    {
      imagePath: '/arc-sys-common-assets/moves/360.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[360],
    },
  ],
  [
    '623',
    {
      imagePath: '/arc-sys-common-assets/moves/623.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[6],
    },
  ],
  [
    'SJC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.SJC,
    },
  ],
  [
    'PRC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.PRC,
    },
  ],
  [
    'RRC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.RRC,
    },
  ],
  [
    'YRC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.YRC,
    },
  ],
  [
    'DL.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['DL.'],
    },
  ],
  [
    'DL',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.DL,
    },
  ],
  [
    'BRC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.BRC,
    },
  ],
  [
    'IAD',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.IAD,
    },
  ],
  [
    'DJ.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['DJ.'],
    },
  ],
  [
    'SJ.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['SJ.'],
    },
  ],
  [
    'JC.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['JC.'],
    },
  ],
  [
    'CL.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['CL.'],
    },
  ],
  [
    'JC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.JC,
    },
  ],
  [
    'WS',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.WS,
    },
  ],
  [
    'CH',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.CH,
    },
  ],
  [
    'SJ',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.SJ,
    },
  ],
  [
    'PC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.PC,
    },
  ],

  [
    'XX',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.XX,
    },
  ],
  [
    'DC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.DC,
    },
  ],
  [
    'WB',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.WB,
    },
  ],
  [
    'AA',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.AA,
    },
  ],
  [
    'RC',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.RC,
    },
  ],
  [
    'CR',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.CR,
    },
  ],
  [
    'CL',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.CL,
    },
  ],
  [
    'C.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['C.'],
    },
  ],
  [
    'F.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['F.'],
    },
  ],
  [
    'J.',
    {
      imagePath: '',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['J.'],
    },
  ],
  [
    '6',
    {
      imagePath: '/arc-sys-common-assets/moves/6.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[6],
    },
  ],
  [
    '8',
    {
      imagePath: '/arc-sys-common-assets/moves/8.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[8],
    },
  ],
  [
    '2',
    {
      imagePath: '/arc-sys-common-assets/moves/2.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[2],
    },
  ],
  [
    '4',
    {
      imagePath: '/arc-sys-common-assets/moves/4.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[4],
    },
  ],
  [
    '3',
    {
      imagePath: '/arc-sys-common-assets/moves/3.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[3],
    },
  ],
  [
    '1',
    {
      imagePath: '/arc-sys-common-assets/moves/1.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[1],
    },
  ],
  [
    '9',
    {
      imagePath: '/arc-sys-common-assets/moves/9.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[9],
    },
  ],
  [
    '7',
    {
      imagePath: '/arc-sys-common-assets/moves/7.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[7],
    },
  ],
  [
    '5',
    {
      imagePath: '/arc-sys-common-assets/moves/5.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP[5],
    },
  ],
  [
    'S',
    {
      imagePath: '/guilty-gear-strive/buttons/S.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.S,
    },
  ],
  [
    'K',
    {
      imagePath: '/guilty-gear-strive/buttons/K.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.K,
    },
  ],
  [
    'H',
    {
      imagePath: '/guilty-gear-strive/buttons/H.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.H,
    },
  ],
  [
    'P',
    {
      imagePath: '/guilty-gear-strive/buttons/P.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.P,
    },
  ],
  [
    'D',
    {
      imagePath: '/guilty-gear-strive/buttons/D.png',
      action: GUILTY_GEAR_STRIVE_COMBO_MAP.D,
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
      action: GUILTY_GEAR_STRIVE_COMBO_MAP['/'],
    },
  ],
]);
