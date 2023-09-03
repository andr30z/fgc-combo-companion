import { GameTypes } from '../types/game-types';

export const GAME_CHARACTERS_MAP = new Map<
  GameTypes,
  Array<{ label: string; value: string }>
>([
  [
    GameTypes.TEKKEN_7,
    [
      { label: 'Akuma', value: 'AKUMA' },
      { label: 'Alisa', value: 'ALISA' },
      { label: 'Anna', value: 'ANNA' },
      { label: 'Armor King', value: 'ARMOR_KING' },
      { label: 'Asuka', value: 'ASUKA' },
      { label: 'Bob', value: 'BOB' },
      { label: 'Bryan', value: 'BRYAN' },
      { label: 'Claudio', value: 'CLAUDIO' },
      { label: 'Devil Jin', value: 'DEVIL_JIN' },
      { label: 'Dragunov', value: 'DRAGUNOV' },
      { label: 'Eddy', value: 'EDDY' },
      { label: 'Eliza', value: 'ELIZA' },
      { label: 'Fahkumram', value: 'FAHKUMRAM' },
      { label: 'Feng', value: 'FENG' },
      { label: 'Ganryu', value: 'GANRYU' },
      { label: 'Geese', value: 'GEESE' },
      { label: 'Gigas', value: 'GIGAS' },
      { label: 'Heihachi', value: 'HEIHACHI' },
      { label: 'Hwoarang', value: 'HWOARANG' },
      { label: 'Jack 7', value: 'JACK-7' },
      { label: 'Jin', value: 'JIN' },
      { label: 'Josie', value: 'JOSIE' },
      { label: 'Julia', value: 'JULIA' },
      { label: 'Katarina', value: 'KATARINA' },
      { label: 'Kazumi', value: 'KAZUMI' },
      { label: 'Kazuya', value: 'KAZUYA' },
      { label: 'King', value: 'KING' },
      { label: 'Kuma', value: 'KUMA' },
      { label: 'Kunimitsu', value: 'KUNIMITSU' },
      { label: 'Lars', value: 'LARS' },
      { label: 'Law', value: 'LAW' },
      { label: 'Lee', value: 'LEE' },
      { label: 'Lei', value: 'LEI' },
      { label: 'Leo', value: 'LEO' },
      { label: 'Leroy', value: 'LEROY' },
      { label: 'Lidia', value: 'LIDIA' },
      { label: 'Lili', value: 'LILI' },
      { label: 'Lucky Chloe', value: 'LUCKY_CHLOE' },
      { label: 'Marduk', value: 'MARDUK' },
      { label: 'Master Raven', value: 'MASTER_RAVEN' },
      { label: 'Miguel', value: 'MIGUEL' },
      { label: 'Negan', value: 'NEGAN' },
      { label: 'Nina', value: 'NINA' },
      { label: 'Noctis', value: 'NOCTIS' },
      { label: 'Panda', value: 'PANDA' },
      { label: 'Paul', value: 'PAUL' },
      { label: 'Shaheen', value: 'SHAHEEN' },
      { label: 'Steve', value: 'STEVE' },
      { label: 'Xiaoyu', value: 'XIAOYU' },
      { label: 'Yoshimitsu', value: 'YOSHIMITSU' },
      { label: 'Zafina', value: 'ZAFINA' },
    ],
  ],
  [
    GameTypes.STREET_FIGHTER_6,
    [
      { label: 'Blanka', value: 'BLANKA' },
      { label: 'Cammy', value: 'CAMMY' },
      { label: 'Chun Li', value: 'CHUN_LI' },
      { label: 'Dee Jay', value: 'DEE_JAY' },
      { label: 'Dhalsim', value: 'DHALSIM' },
      { label: 'E. Honda', value: 'E_HONDA' },
      { label: 'Guile', value: 'GUILE' },
      { label: 'Jamie', value: 'JAMIE' },
      { label: 'JP', value: 'JP' },
      { label: 'Juri', value: 'JURI' },
      { label: 'Ken', value: 'KEN' },
      { label: 'Kimberly', value: 'KIMBERLY' },
      { label: 'Lily', value: 'LILY' },
      { label: 'Luke', value: 'LUKE' },
      { label: 'Manon', value: 'MANON' },
      { label: 'Marisa', value: 'MARISA' },
      { label: 'Ryu', value: 'RYU' },
      { label: 'Zangief', value: 'ZANGIEF' },
      { label: 'Rashid', value: 'RASHID' },
    ],
  ],
  [
    GameTypes.GUILTY_GEAR_STRIVE,
    [
      { label: 'Sol Badguy', value: 'SOL_BADGUY' },
      { label: 'Ky Kiske', value: 'KY_KISKE' },
      { label: 'May', value: 'MAY' },
      { label: 'Faust', value: 'FAUST' },
      { label: 'Potemkin', value: 'POTEMKIN' },
      { label: 'Chipp Zanuff', value: 'CHIPP_ZANUFF' },
      { label: 'Zato ONE', value: 'ZATO_ONE' },
      { label: 'Millia Rage', value: 'MILLIA_RAGE' },
      { label: 'Axl Low', value: 'AXL_LOW' },
      { label: 'Testament', value: 'TESTAMENT' },
      { label: 'Baiken', value: 'BAIKEN' },
      { label: 'Anji Mito', value: 'ANJI_MITO' },
      { label: 'Bridget', value: 'BRIDGET' },
      { label: 'I-No', value: 'I_NO' },
      { label: 'Sin Kiske', value: 'SIN_KISKE' },
      { label: 'Leo Whitefang', value: 'LEO_WHITEFANG' },
      { label: 'Ramlethal Valentine', value: 'RAMLETHAL_VALENTINE' },
      { label: "Jack O' Valentine", value: 'JACK_O_VALENTINE' },
      { label: 'Giovanna', value: 'GIOVANNA' },
      { label: 'Nagoriyuki', value: 'NAGORIYUKI' },
      { label: 'Goldlewis Dickinson', value: 'GOLDLEWIS_DICKINSON' },
      { label: 'Happy Chaos', value: 'HAPPY_CHAOS' },
      { label: 'Bedman?', value: 'BEDMAN' },
      { label: 'Asuka R Kreutz', value: 'ASUKA_R_KREUTZ' },
      { label: 'Johnny', value: 'JOHNNY' },
    ],
  ],
  [
    GameTypes.DB_FIGHTERZ,
    [
      {
        label: 'Android 16',
        value: 'ANDROID_16',
      },
      {
        label: 'Android 17',
        value: 'ANDROID_17',
      },
      {
        label: 'Android 18',
        value: 'ANDROID_18',
      },
      {
        label: 'Android 21',
        value: 'ANDROID_21',
      },
      {
        label: 'Android 21 (Lab Coat)',
        value: 'ANDROID_21_LAB_COAT',
      },
      {
        label: 'Bardock',
        value: 'BARDOCK',
      },
      {
        label: 'Beerus',
        value: 'BEERUS',
      },
      {
        label: 'Broly',
        value: 'BROLY',
      },
      {
        label: 'Broly (DBS)',
        value: 'BROLY_DBS',
      },
      {
        label: 'Captain Ginyu',
        value: 'CAPTAIN_GINYU',
      },
      {
        label: 'Cell',
        value: 'CELL',
      },
      {
        label: 'Cooler',
        value: 'COOLER',
      },
      {
        label: 'Frieza',
        value: 'FRIEZA',
      },
      {
        label: 'Gogeta SS4',
        value: 'GOGETA_SS4',
      },
      {
        label: 'Gogeta SSGSS',
        value: 'GOGETA_SSGSS',
      },
      {
        label: 'Gohan Adult',
        value: 'GOHAN_ADULT',
      },
      {
        label: 'Gohan Teen',
        value: 'GOHAN_TEEN',
      },
      {
        label: 'Goku',
        value: 'GOKU',
      },
      {
        label: 'Goku (GT)',
        value: 'GOKU_GT',
      },
      {
        label: 'Goku SSGSS',
        value: 'GOKU_SSGSS',
      },
      {
        label: 'Goku SUPER SAIYAN',
        value: 'GOKU_SUPER_SAIYAN',
      },
      {
        label: 'Goku Ultra Instinct',
        value: 'GOKU_ULTRA_INSTINCT',
      },
      {
        label: 'Goku Black',
        value: 'GOKU_BLACK',
      },
      {
        label: 'Gotenks',
        value: 'GOTENKS',
      },
      {
        label: 'Hit',
        value: 'HIT',
      },
      {
        label: 'Janemba',
        value: 'JANEMBA',
      },
      {
        label: 'Jiren',
        value: 'JIREN',
      },
      {
        label: 'Kefla',
        value: 'KEFLA',
      },
      {
        label: 'Kid Buu',
        value: 'KID_BUU',
      },
      {
        label: 'Krillin',
        value: 'KRILLIN',
      },
      {
        label: 'Majin Buu',
        value: 'MAJIN_BUU',
      },
      {
        label: 'Master Roshi',
        value: 'MASTER_ROSHI',
      },
      {
        label: 'Nappa',
        value: 'NAPPA',
      },
      {
        label: 'Piccolo',
        value: 'PICCOLO',
      },
      {
        label: 'Super Baby 2',
        value: 'SUPER_BABY_2',
      },
      {
        label: 'Tien',
        value: 'TIEN',
      },
      {
        label: 'Trunks',
        value: 'TRUNKS',
      },
      {
        label: 'Vegeta',
        value: 'VEGETA',
      },
      {
        label: 'Vegeta SSGSS',
        value: 'VEGETA_SSGSS',
      },
      {
        label: 'Vegeta Super Saiyan',
        value: 'VEGETA_SUPER_SAIYAN',
      },
      {
        label: 'Vegito SSGSS',
        value: 'VEGITO_SSGSS',
      },
      {
        label: 'Videl',
        value: 'VIDEL',
      },
      {
        label: 'Yamcha',
        value: 'YAMCHA',
      },
      {
        label: 'Zamasu (Fused)',
        value: 'ZAMASU_FUSED',
      },
    ],
  ],
]);

export function getCharacterName(game: GameTypes, character: string) {
  return GAME_CHARACTERS_MAP.get(game)?.find((c) => c.value === character)
    ?.label;
}
