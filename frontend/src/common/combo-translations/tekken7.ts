import {
  Tekken7MapKey,
  TEKKEN_7_COMBO_MAP_TRANSLATION,
} from '@/common/constants/tekken7-notation-map';
import { ComboStepTranslation } from '@/common/types/combo-translation';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '@/common/utils/String';
import type { ComboTranslatorType } from '../types/combo-translator';

export const tekken7Translator: ComboTranslatorType = (combo) => {
  const translation = addSpacesToStringIfBeforePlus(combo)
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
};
