import {
  Tekken7MapKey,
  TEKKEN_7_COMBO_MAP_TRANSLATION,
} from '@/common/constants/ComboMappers';
import type {
  ComboStepTranslation,
  ComboTranslation,
} from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '@/common/utils/String';

import { useMemo } from 'react';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

function tekken7Translator(combo: string): ComboTranslation {
  const translation = addSpacesToStringIfBeforePlus(combo)
    .split(',')
    .map((localStep) => {
      let localStepTranslated = String(localStep);

      const toImageTranslation = splitMulti(
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
        actions: toImageTranslation.map((item) => ({
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
}: UseComboTranslatorParams): ComboTranslation {
  return useMemo(() => tekken7Translator(combo), [combo]);
}
