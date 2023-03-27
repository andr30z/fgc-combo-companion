import { GameTypes } from '@/common/types/combo';
import {
  replaceAllExceptInBetweenCurlyBracket,
  splitMulti,
} from '@/common/utils/String';
import { useMemo } from 'react';

interface UseComboTranslatorParams {
  game: GameTypes;
  combo: string;
}

function tekken7Translator(combo: string) {
  const mapa: any = {
    F: 'Frente',
    N: 'Neutro',
    D: 'Baixo',
    B: 'Trás',
    DF: 'Baixo-Frente',
    DB: 'BAIXO-TRAS',
    UF: 'CIMA-Frente',
    UB: 'CIMA-TRAS',
    BF: 'TRAS-FRENTE',
    FB: 'FRENTE-BAIXO',
    'S!': 'SCREW',
    SSR: 'SIDE STEP RIGHT',
    SSL: 'SIDE STEP LEFT',
    SWL: 'SIDE WALK LEFT',
    SWR: 'SIDE WALK RIGHT',
    WR: 'WHILE RUNNING',
    2: 'triângulo',
    1: 'quadrado',
    3: 'XIS',
    4: 'BOLA',
  };

  let resultado = combo
    .split(',')
    .map((localStep) => {
      let result = String(localStep);
      splitMulti(result, [' ', '+', '[', ']']).forEach((localItem) => {
        const uppedCasedItem = localItem.toUpperCase();
        const mapItem = mapa[uppedCasedItem];
        if (mapItem) {
          result = replaceAllExceptInBetweenCurlyBracket(
            result,
            localItem,
            mapItem,
          );
        }
      });
      return result;
    })
    .join(', ');
  resultado = resultado.replace(/{|}/g, '');
  return resultado;
}

export function useComboTranslator({ combo, game }: UseComboTranslatorParams) {
  return useMemo(() => String(tekken7Translator(combo)), [combo]);
}
