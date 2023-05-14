import type { ComboStepTranslation } from '../types/combo-translation';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '../utils/string';

type DefaultComboTranslatorParams = {
  combo: string;
  comboSeparators: Array<string>;
  upperCaseCombo?: boolean;
  map: {
    [x: string]: {
      action: string;
      imagePath: string | Array<string>;
    };
  };
};

export function defaultComboTranslator({
  combo,
  map,
  comboSeparators,
  upperCaseCombo = true,
}: DefaultComboTranslatorParams) {
  const translation = addSpacesToStringIfBeforePlus(combo)
    .split(',')
    .map((localStep) => {
      let localStepTranslated = String(localStep);

      const imageTranslation = splitMulti(
        replaceSpacesWithinBraces(localStepTranslated),
        comboSeparators,
      ).map((localItem) => {
        const upperCasedItem = upperCaseCombo
          ? localItem.toUpperCase()
          : localItem;
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
