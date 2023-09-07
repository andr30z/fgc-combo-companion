import { STREET_FIGHTER_6_COMBO_MAP_TRANSLATION } from '../constants/street-fighter-6-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { addSpacesToStringIfBeforePlus } from '../utils/string';
import { defaultTranslator } from './default-translator';

export const streetFighter6Translator: ComboTranslatorType = (combo) => {
  return defaultTranslator(
    addSpacesToStringIfBeforePlus(combo),
    STREET_FIGHTER_6_COMBO_MAP_TRANSLATION,
    {
      comboSeparators: [',', '+ ', '.'],
    },
  );
};
