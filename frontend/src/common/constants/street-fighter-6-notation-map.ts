export const STREET_FIGHTER_6_COMBO_MAP = {
  U: 'UP',
  F: 'FORWARD',
  B: 'BACK',
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
  PPP: 'ALL PUNCHES',
  K: 'KICK',
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
} as const;

export type StreetFighter6MapKey = keyof typeof STREET_FIGHTER_6_COMBO_MAP;

export const STREET_FIGHTER_6_COMBO_MAP_TRANSLATION = {
  S: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.S,
  },
  CR: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.CR,
  },
  C: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.C,
  },
  J: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.J,
  },
  F: {
    imagePath: '/street-fighter-6/moves/forward.png',
    action: STREET_FIGHTER_6_COMBO_MAP.F,
  },
  U: {
    imagePath: '/street-fighter-6/moves/up.png',
    action: STREET_FIGHTER_6_COMBO_MAP.U,
  },
  D: {
    imagePath: '/street-fighter-6/moves/down.png',
    action: STREET_FIGHTER_6_COMBO_MAP.D,
  },
  B: {
    imagePath: '/street-fighter-6/moves/back.png',
    action: STREET_FIGHTER_6_COMBO_MAP.B,
  },
  DF: {
    imagePath: '/street-fighter-6/moves/downforward.png',
    action: STREET_FIGHTER_6_COMBO_MAP.DF,
  },
  DB: {
    imagePath: '/street-fighter-6/moves/downback.png',
    action: STREET_FIGHTER_6_COMBO_MAP.DB,
  },
  UF: {
    imagePath: '/street-fighter-6/moves/upforward.png',
    action: STREET_FIGHTER_6_COMBO_MAP.UF,
  },
  UB: {
    imagePath: '/street-fighter-6/moves/upbackward.png',
    action: STREET_FIGHTER_6_COMBO_MAP.UB,
  },
  QCF: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.QCF },
  QCB: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.QCB },
  CH: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.CH },
  HCF: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.HCF },
  HCB: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.HCB },
  K: {
    imagePath: '/street-fighter-6/buttons/kick.png',
    action: STREET_FIGHTER_6_COMBO_MAP.K,
  },
  P: {
    imagePath: '/street-fighter-6/buttons/punch.png',
    action: STREET_FIGHTER_6_COMBO_MAP.P,
  },
  DP: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.DP,
  },
  PC: {
    imagePath: '',
    action: STREET_FIGHTER_6_COMBO_MAP.PC,
  },
  PPP: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.PPP },
  KKK: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.KKK },
  LP: {
    imagePath: '/street-fighter-6/buttons/light_punch.png',
    action: STREET_FIGHTER_6_COMBO_MAP.LP,
  },
  MP: {
    imagePath: '/street-fighter-6/buttons/mid_punch.png',
    action: STREET_FIGHTER_6_COMBO_MAP.MP,
  },
  HP: {
    imagePath: '/street-fighter-6/buttons/heavy_punch.png',
    action: STREET_FIGHTER_6_COMBO_MAP.HP,
  },
  LK: {
    imagePath: '/street-fighter-6/buttons/light_kick.png',
    action: STREET_FIGHTER_6_COMBO_MAP.LK,
  },
  HK: {
    imagePath: '/street-fighter-6/buttons/heavy_kick.png',
    action: STREET_FIGHTER_6_COMBO_MAP.HK,
  },
  MK: {
    imagePath: '/street-fighter-6/buttons/mid_kick.png',
    action: STREET_FIGHTER_6_COMBO_MAP.MK,
  },
  XX: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.XX },
  DRC: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DRC },
  DR: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DR },
  DI: { imagePath: '', action: STREET_FIGHTER_6_COMBO_MAP.DI },
} as const;
