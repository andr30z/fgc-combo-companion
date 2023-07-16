import {
  GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP,
  GuiltyGearStriveMapKey,
} from '@/common/constants/guilty-gear-strive-map';
import { ComboStepTranslation } from '../types/combo-translation';
import type { ComboTranslatorType } from '../types/combo-translator';
import {
  replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket,
  splitMulti,
} from '../utils/string';

export const guiltyGearStriveTranslator: ComboTranslatorType = (combo) => {
  let comboCopy = combo;
  // let finalCombo = combo;
  for (const [key] of GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP) {
    console.log(key);
    comboCopy = replaceAllWithNoSeparatorsExceptInBetweenCurlyBracket(
      comboCopy.toUpperCase(),
      key.toUpperCase(),
      '#{' + `${key}}#`,
    );
    console.log(comboCopy);
  }
  const splitedResult = splitMulti(
    comboCopy,
    [' ', ', ', ' ,', ' >', '> ', '}#'],
    '',
  );

  console.log(
    splitedResult.filter((x, index) => {
      if (index === 0 || splitedResult.length - 1 === index) {
        return x !== '';
      }

      if (x === '' && splitedResult[index + 1] === '') {
        return false;
      }
      return true;
    }),
  );

  const finalCombo = splitedResult
    .filter((x, index) => {
      if (index === 0 || splitedResult.length - 1 === index) {
        return x !== '';
      }

      if (x === '' && splitedResult[index + 1] === '') {
        return false;
      }
      return true;
    })
    .map((localItem) => {
      const upperCasedItem = localItem
        .toUpperCase()
        .replace('#{', '')
        .replace('}#', '');
      // console.log(upperCasedItem);
      const mapItem = GUILTY_GEAR_STRIVE_COMBO_NOTATION_MAP.get(
        upperCasedItem as GuiltyGearStriveMapKey,
      );

      if (mapItem) {
        return mapItem;
      }
      const defaultComboStep: ComboStepTranslation = {
        action: localItem
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
