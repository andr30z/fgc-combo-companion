import { DRAGON_BALL_FIGHTERZ_NOTATION_MAP } from '../constants/db-fighterz-notation-map';
import type { ComboTranslatorType } from '../types/combo-translator';
import { arcSystemGamesComboTranslator } from './default-translator';

/**
 * @author andr30z
 **/
export const dragonBallFighterZTranslator: ComboTranslatorType = (combo) => {
  return arcSystemGamesComboTranslator(
    combo,
    DRAGON_BALL_FIGHTERZ_NOTATION_MAP,
  );
};
