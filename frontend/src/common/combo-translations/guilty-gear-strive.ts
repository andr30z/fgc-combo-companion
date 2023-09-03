import { GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP } from '@/common/constants/guilty-gear-strive-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { arcSystemGamesComboTranslator } from './default-translator';

export const guiltyGearStriveTranslator: ComboTranslatorType = (combo) => {
  //replace [] and ][
  return arcSystemGamesComboTranslator(
    combo,
    GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP,
  );
};
