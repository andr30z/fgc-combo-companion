import { TEKKEN_7_COMBO_MAP_TRANSLATION } from '@/common/constants/tekken7-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { defaultComboTranslator } from './default-translator';

export const tekken7Translator: ComboTranslatorType = (combo) => {
  return defaultComboTranslator({
    combo,
    comboSeparators: [' ', '+ ', ' +'],
    map: TEKKEN_7_COMBO_MAP_TRANSLATION,
    upperCaseCombo: false,
  });
};
