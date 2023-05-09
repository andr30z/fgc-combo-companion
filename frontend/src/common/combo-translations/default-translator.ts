import type { ComboStepTranslation } from '../types/combo-translation';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '../utils/String';

type DefaultComboTranslatorParams = {
  combo: string;
  comboSeparators: Array<string>;
  map: {
    [x: string]: {
      action: string;
      imagePath: string;
    };
  };
};

export function defaultComboTranslator({
  combo,
  map,
  comboSeparators,
}: DefaultComboTranslatorParams) {
  const translation = addSpacesToStringIfBeforePlus(combo)
    .split(',')
    .map((localStep) => {
      let localStepTranslated = String(localStep);

      const imageTranslation = splitMulti(
        replaceSpacesWithinBraces(localStepTranslated),
        comboSeparators,
      ).map((localItem) => {
        const upperCasedItem = localItem.toUpperCase();
        const mapItem = map[upperCasedItem];

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
