import { TWOXKO_COMBO_MAP_TRANSLATION } from '../constants/2xko-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { addSpacesToStringIfBeforePlus } from '../utils/string';
import { defaultTranslator } from './default-translator';

export const twoXKOTranslator: ComboTranslatorType = (combo) => {
  return defaultTranslator(
    addSpacesToStringIfBeforePlus(combo),
    TWOXKO_COMBO_MAP_TRANSLATION,
    {
      comboSeparators: [',', '.'],
    },
  );
};
