import {
  STREET_FIGHTER_6_COMBO_MAP_TRANSLATION,
  StreetFighter6MapKey,
} from '../constants/street-fighter-6-notation-map';
import type { ComboStepTranslation } from '../types/combo-translation';
import type { ComboTranslatorType } from '../types/combo-translator';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '../utils/String';

export const streetFighter6Translator: ComboTranslatorType = (combo) => {
  const translation = addSpacesToStringIfBeforePlus(combo)
    .split(',')
    .map((localStep) => {
      let localStepTranslated = String(localStep);

      const imageTranslation = splitMulti(
        replaceSpacesWithinBraces(localStepTranslated),
        [' ', '> ', ' >', '.', '/', '+ ', ' +'],
      ).map((localItem) => {
        const upperCasedItem = localItem.toUpperCase();
        const mapItem =
          STREET_FIGHTER_6_COMBO_MAP_TRANSLATION[
            upperCasedItem as StreetFighter6MapKey
          ];

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
