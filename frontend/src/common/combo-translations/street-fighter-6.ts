import { STREET_FIGHTER_6_COMBO_MAP_TRANSLATION } from '../constants/street-fighter-6-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { defaultComboTranslator } from './default-translator';

export const streetFighter6Translator: ComboTranslatorType = (combo) => {
  return defaultComboTranslator({
    combo,
    comboSeparators: [' ', '.', '/', '+ ', ' +'],
    map: STREET_FIGHTER_6_COMBO_MAP_TRANSLATION,
  });
};
