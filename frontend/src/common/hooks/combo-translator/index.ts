import type { ComboTranslationInterface } from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import { tekken7Translator } from '@/common/combo-translations/tekken7';
import { useMemo } from 'react';
import { ComboTranslatorType } from '@/common/types/combo-translator';
import { streetFighter6Translator } from '@/common/combo-translations/street-fighter-6';
import { guiltyGearStriveTranslator } from '@/common/combo-translations/guilty-gear-strive';
import { dragonBallFighterZTranslator } from '@/common/combo-translations/dragon-ball-fighterz';
import { tekken8Translator } from '@/common/combo-translations/tekken8';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

const translatorDictionary: Record<GameTypes, ComboTranslatorType> = {
  [GameTypes.TEKKEN_7]: tekken7Translator,
  [GameTypes.TEKKEN_8]: tekken8Translator,
  [GameTypes.MORTAL_KOMBAT_1]: tekken7Translator,
  [GameTypes.STREET_FIGHTER_6]: streetFighter6Translator,
  [GameTypes.GUILTY_GEAR_STRIVE]: guiltyGearStriveTranslator,
  [GameTypes.DB_FIGHTERZ]: dragonBallFighterZTranslator,
  [GameTypes.KOF_XV]: () => ({
    combo: '',
    actions: [],
  }),
  [GameTypes.STREET_FIGHTER_V]: () => ({
    actions: [],
    combo: '',
  }),
  [GameTypes.TWOXKO]: () => ({
    combo: '',
    actions: [],
  }),
};

export function useComboTranslator({
  combo,
  game,
}: UseComboTranslatorParams): ComboTranslationInterface {
  const comboTranslator = (): ComboTranslationInterface => {
    const translatorFunction = translatorDictionary[game];
    return translatorFunction
      ? translatorFunction(combo)
      : { actions: [], combo: '' };
  };
  return useMemo(comboTranslator, [combo]);
}
