import type { ComboTranslationInterface } from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import { tekken7Translator } from '@/common/combo-translations/tekken7';
import { useMemo } from 'react';
import { ComboTranslatorType } from '@/common/types/combo-translator';
import { streetFighter6Translator } from '@/common/combo-translations/street-fighter-6';
import { guiltyGearStriveTranslator } from '@/common/combo-translations/guilty-gear-strive';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

const translatorDictionary: Record<GameTypes, ComboTranslatorType> = {
  TEKKEN_7: tekken7Translator,
  STREET_FIGHTER_6: streetFighter6Translator,
  GUILTY_GEAR_STRIVE: guiltyGearStriveTranslator,
  KOF_XV: () => ({
    combo: '',
    actions: [],
  }),
  SFV: () => ({
    actions: [],
    combo: '',
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
