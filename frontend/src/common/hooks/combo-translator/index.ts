import {
  Tekken7MapKey,
  TEKKEN_7_COMBO_MAP_TRANSLATION,
} from '@/common/constants/ComboMappers';
import type {
  ComboStepTranslation,
  ComboTranslationInterface,
} from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import {
  addSpacesToStringBeforeAllPlusSigns,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '@/common/utils/string';

import { useMemo } from 'react';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

export function tekken7Translator(combo: string): ComboTranslationInterface {
  const translation = addSpacesToStringBeforeAllPlusSigns(combo)
    .split(',')
    .map((localStep) => {
      let localStepTranslated = String(localStep);

      const imageTranslation = splitMulti(
        replaceSpacesWithinBraces(localStepTranslated),
        [' ', '/', '+ ', ' +'],
      ).map((localItem) => {
        const upperCasedItem = localItem.toUpperCase();
        const mapItem =
          TEKKEN_7_COMBO_MAP_TRANSLATION[upperCasedItem as Tekken7MapKey];

        if (mapItem) {
          localStepTranslated = replaceAllExceptInBetweenCurlyBracket(
            localStepTranslated,
            localItem,
            mapItem.action,
          );
          return mapItem;
        }
        const defaultComboStep: ComboStepTranslation = {
          action: upperCasedItem,
          imagePath: '',
        };
        return defaultComboStep;
      });

      return {
        combo: replaceComboWithSpaceFlagWithinBraces(
          localStepTranslated,
        ).replace(/{|}/g, ''),
        actions: imageTranslation.map((item) => ({
          ...item,
          action: replaceComboWithSpaceFlagWithinBraces(item.action).replace(
            /{|}/g,
            '',
          ),
        })),
      };
    });
  return {
    combo: translation.map((item) => item.combo).join(', '),
    actions: translation.map((item) => item.actions),
  };
}

export function useComboTranslator({
  combo,
}: UseComboTranslatorParams): ComboTranslationInterface {
  return useMemo(() => tekken7Translator(combo), [combo]);
}
