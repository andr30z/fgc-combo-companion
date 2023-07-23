import {
  GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP,
  GuiltyGearStriveMapKey,
} from '@/common/constants/guilty-gear-strive-map';
import { ComboStepTranslation } from '../types/combo-translation';
import type { ComboTranslatorType } from '../types/combo-translator';
import {
  replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket,
  replaceComboWithSpaceFlagWithinBraces,
  replaceSpacesWithinBraces,
  splitMulti,
} from '../utils/string';

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

// {CHAR: ZATO-1} 236H / 214H~]H[, CH 2H > 214S, {delay} ]S[,  {delay} 2H > 214K, [6]c.S > [3][2S] > [3][2H], {delay} ]S[,]H[, {delay} 2H > 214K, c.S > 2S > 2H > 22H
// {CHAR: ZATO-1} 5P/2P{x 3} > 66 RRC > 66 > 2H > 214H > 2S > 2H > 236S > 66 > 2S > 2H > WS > 214H > WB
export const guiltyGearStriveTranslator: ComboTranslatorType = (combo) => {
  let comboCopy = replaceHoldReleaseInput(combo, 'HOLD');
  comboCopy = replaceHoldReleaseInput(comboCopy, 'RELEASE');

  for (const [key] of GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP) {
    comboCopy = replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket(
      comboCopy.toUpperCase(),
      key.toUpperCase(),
      `#{${key}}#`,
    );
  }

  const splitedResult = splitMulti(
    replaceSpacesWithinBraces(comboCopy),
    [' ', ', ', ' ,', ' >', '> ', '}#'],
    '',
  );

  const finalCombo = splitedResult
    .filter((x, index) => {
      // console.log(x);
      if (index === 0 || splitedResult.length - 1 === index) {
        return x !== '';
      }

      const forwardItem = splitedResult[index + 1];
      const backwardItem = splitedResult[index - 1];

      if (forwardItem && forwardItem.replace('#{', '') === '/' && x === '') {
        return false;
      }

      if (backwardItem && backwardItem.replace('#{', '') === '/' && x === '') {
        return false;
      }

      if (x.replace('#{', '') === ',' && forwardItem !== '') {
        return false;
      }
      if (x.replace('#{', '') === '>' && forwardItem !== '') {
        return false;
      }

      if (x === '' && forwardItem !== '') {
        return false;
      }
      return true;
    })
    .map((localItem) => {
      const upperCasedItem = replaceComboWithSpaceFlagWithinBraces(localItem)
        .toUpperCase()
        .replace(',{', '')
        .replace('#{', '')
        .replace('}#', '');
      const mapItem = GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP.get(
        upperCasedItem as GuiltyGearStriveMapKey,
      );

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
    actions: [finalCombo],
  };
};
