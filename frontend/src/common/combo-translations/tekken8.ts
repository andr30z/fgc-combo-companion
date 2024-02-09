import { TEKKEN_8_COMBO_MAP_TRANSLATION } from '../constants/tekken8-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { addSpacesToStringIfBeforePlus } from '../utils/string';
import { defaultTranslator } from './default-translator';

export const tekken8Translator: ComboTranslatorType = (combo) => {
  return defaultTranslator(
    addSpacesToStringIfBeforePlus(combo),
    TEKKEN_8_COMBO_MAP_TRANSLATION,
    {
      uppercaseBeforeTranslation: false,
      upperCaseMapKeys: false,
      uppercaseTranslationWhenFindingMapKeys: false,
      comboSeparators: [',', '+ '],
    },
  );
};
