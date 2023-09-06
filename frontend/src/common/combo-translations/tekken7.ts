import { TEKKEN_7_COMBO_MAP_TRANSLATION } from '@/common/constants/tekken7-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { addSpacesToStringIfBeforePlus } from '../utils/string';
import { defaultTranslator } from './default-translator';

export const tekken7Translator: ComboTranslatorType = (combo) => {
  return defaultTranslator(
    addSpacesToStringIfBeforePlus(combo),
    TEKKEN_7_COMBO_MAP_TRANSLATION,
    {
      uppercaseBeforeTranslation: false,
      upperCaseMapKeys: false,
      uppercaseTranslationWhenFindingMapKeys: false,
      comboSeparators: [',', '+ '],
    },
  );
};
