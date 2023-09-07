import type {
  ComboStepTranslation,
  ComboTranslationInterface,
} from '../types/combo-translation';
import {
  addSpacesToStringIfBeforePlus,
  replaceAllExceptInBetweenCurlyBracket,
  replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '../utils/string';

type DefaultComboTranslatorParams = {
  combo: string;
  comboSeparators: Array<string>;
  upperCaseCombo?: boolean;
  map: Map<string, ComboStepTranslation>;
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
        const mapItem = map.get(upperCasedItem);

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

function replaceHoldReleaseInput(combo: string, type: 'RELEASE' | 'HOLD') {
  const regex = type === 'HOLD' ? /\[[^[\]]{1,3}\]/g : /\][^[\]]{1,3}\[/g;
  const translation = `{${type}}`;
  const replacedCombo = combo.replace(regex, (match) => {
    const slicedMatch = match.slice(1, -1);

    if (
      (match.startsWith('{') && match.endsWith('}')) ||
      slicedMatch.includes(' ') ||
      slicedMatch.length > 2 ||
      slicedMatch === ','
    ) {
      return match; // Maintain patterns between curly braces or containing brackets
    }

    return `${translation} ${slicedMatch}`;
  });

  return replacedCombo;
}

/**
 * FUCK ALL ARC SYSTEM GAMES COMBO NOTATIONS
 *
 *
 * @author andr30z
 **/
export function arcSystemGamesComboTranslator(
  combo: string,
  notationsMap: Map<string, ComboStepTranslation>,
): ComboTranslationInterface {
  //replace [] and ][
  let comboCopy = replaceHoldReleaseInput(combo, 'HOLD');
  comboCopy = replaceHoldReleaseInput(comboCopy, 'RELEASE');

  return defaultTranslator(comboCopy, notationsMap);
}

type TranslationOptions = {
  uppercaseBeforeTranslation?: boolean;
  upperCaseMapKeys?: boolean;
  comboSeparators?: Array<string>;
  uppercaseTranslationWhenFindingMapKeys?: boolean;
  formatComboBeforeSeparation?: (combo: string) => string;
};

/**
 * Maybe use this function as default combo translator for all games?
 * @param combo
 * @param notationsMap
 */
export function defaultTranslator(
  combo: string,
  notationsMap: Map<string, ComboStepTranslation>,
  {
    uppercaseBeforeTranslation = true,
    comboSeparators = [', ', ' ,'],
    upperCaseMapKeys = true,
    uppercaseTranslationWhenFindingMapKeys = true,
    formatComboBeforeSeparation,
  }: TranslationOptions = {},
): ComboTranslationInterface {
  let comboCopy = combo;
  //mark combo translations
  for (const [key] of notationsMap) {
    const mapItem = notationsMap.get(key);
    const upperCasedItem =
      mapItem?.uppercaseBeforeTranslation ?? uppercaseBeforeTranslation;
    comboCopy = replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket(
      upperCasedItem ? comboCopy.toUpperCase() : comboCopy,
      mapItem?.regex
        ? mapItem?.regex
        : upperCaseMapKeys
        ? key.toUpperCase()
        : key,
      mapItem?.replaceString ? mapItem?.replaceString : `#{${key}}#`,
    );
  }

  //break combo in pieces
  const splitedResult = splitMulti(
    formatComboBeforeSeparation
      ? formatComboBeforeSeparation(comboCopy)
      : replaceSpacesWithinBraces(comboCopy),
    [' ', ' >', '> ', '}#', ...comboSeparators],
    '',
  );

  const finalCombo = splitedResult
    .filter((x, index) => {
      if (index === 0 || splitedResult.length - 1 === index) {
        return x !== '';
      }

      const forwardItem = splitedResult[index + 1];
      const backwardItem = splitedResult[index - 1];

      //verify for redundant spaces inbetween 'OR' expressions
      if (forwardItem && forwardItem.replace('#{', '') === '/' && x === '') {
        return false;
      }
      if (backwardItem && backwardItem.replace('#{', '') === '/' && x === '') {
        return false;
      }

      //verify for redundant link expressions
      if (x.replace('#{', '') === ',' && forwardItem !== '') {
        return false;
      }
      if (x.replace('#{', '') === '>' && forwardItem !== '') {
        return false;
      }

      //remove useless spaces
      if (x === '' && forwardItem !== '') {
        return false;
      }
      return true;
    })
    .map((localItem) => {
      //remove combo translation flags and perfom replacements
      let translationItem = replaceComboWithSpaceFlagWithinBraces(localItem);

      if (uppercaseTranslationWhenFindingMapKeys) {
        translationItem = translationItem.toUpperCase();
      }

      translationItem = translationItem
        .replace(',{', '')
        .replace('#{', '')
        .replace('}#', '');
      const mapItem = notationsMap.get(translationItem);

      if (mapItem) {
        return mapItem;
      }

      const defaultComboStep: ComboStepTranslation = {
        action: replaceComboWithSpaceFlagWithinBraces(localItem)
          .replace(',', '')
          .replace('#{', '')
          .replace('}#', '')
          .replace('{', '')
          .replace('}', ''),
        imagePath: '',
      };
      return defaultComboStep;
    });

  return {
    combo: finalCombo.map((item) => item.action).join(', '),
    //this will need to be changed
    actions: [finalCombo],
  };
}
