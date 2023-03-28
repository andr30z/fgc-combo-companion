import { GameTypes } from '@/common/types/game-types';
import {
  replaceAllExceptInBetweenCurlyBracket,
  splitMulti,
} from '@/common/utils/String';
import {
  Tekken7MapType,
  TEKKEN_7_COMBO_MAP_TRANSLATION,
} from '@/common/constants/ComboMappers';
import { useMemo } from 'react';
import type {
  ComboStepTranslation,
  ComboTranslation,
} from '@/common/types/combo-translation';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

function tekken7Translator(combo: string): ComboTranslation {
  const translation = combo.split(',').map((localStep) => {
    let localStepTranslated = String(localStep);

    const toImageTranslation = splitMulti(localStepTranslated, [
      ' ',
      '+',
    ]).map((localItem) => {
      const upperCasedItem = localItem.toUpperCase();
      const mapItem =
        TEKKEN_7_COMBO_MAP_TRANSLATION[upperCasedItem as Tekken7MapType];

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
      combo: localStepTranslated.replace(/{|}/g, ''),
      actions: toImageTranslation,
    };
  });
  return {
    combo: translation.map((item) => item.combo).join(', '),
    actions: translation.map((item) => item.actions),
  };
}

export function useComboTranslator({
  combo,
  game,
}: UseComboTranslatorParams): ComboTranslation {
  return useMemo(() => tekken7Translator(combo), [combo]);
}
