'use client';
import { Button } from '@/common/components/button';
import { ComboInput } from '@/common/components/combo-input';
import { ComboTranslation } from '@/common/components/combo-translation';
import { GameSelect } from '@/common/components/game-select';
import { GameTypes } from '@/common/types/game-types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsFillShareFill } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';

const randomCombos = [
  'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, B+2,1 S!, {DASH} f,n,d,df+4,1 {CHAR: KAZUYA}',
  'f+1+2 S!  f,f+4,3 {delay last hit}  df+4,2,1+2 {CHAR: FENG WEI}',
  'FC df+1, ws+2,2  S!  wr+2+4 {CHAR: KING}',
  'f,b+2,1, f+3 {DYNAMIC ENTRY} 2, df+3 d {DYNAMIC ENTRY} 2, f+2,1 {SILENT ENTRY} 3+4 S!, f,f,f+3+4 {DYNAMIC ENTRY} 1 f, {SILENT ENTRY} 1 {CHAR: Lars}',
  'ws+2, b+1,2 S!, d,df,f+1, b+2,1 {HOLD} {CHAR: PAUL PHEONIX}',
  'df+3+4, b+3,3 {RELAX} 2,3, b+2,4 S!, {DASH} d+2,3 {RELAX} 3 {CHAR: Eddy}',
  '[ 3,4 ] {BT} b+2,3, b+2,4,2 S!, f,f+3, f,f+4 {CHAR: MASTER RAVEN}',
  'SS 2,1, df+3 df+1  df+3  db+2,4 S!, wr+2+4 {CHAR: ARMOR KING}',
];
export default function ComboTranslator() {
  const params = useSearchParams();
  const comboSearchParam = params?.get('combo');
  const [combo, setCombo] = useState(
    comboSearchParam ? decodeURIComponent(comboSearchParam) : '',
  );
  const setRandomCombo = (): void => {
    const randomCombo =
      randomCombos[Math.floor(Math.random() * randomCombos.length)];
    if (randomCombo === combo) {
      return setRandomCombo();
    }
    setCombo(randomCombo);
  };

  return (
    <main className="w-full h-full min-h-80vh flex flex-col items-center justify-center px-10 gap-24">
      <GameSelect onSelect={() => null} selectedOption={GameTypes.TEKKEN_7} />
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <ComboInput combo={combo} setCombo={setCombo} />
        <div className="gap-2 flex flex-row flex-wrap justify-center">
          <Button
            dataTestId="random-combo-button"
            color="primary"
            text="Random Combo"
            leftIcon={<FaRandom size={17} />}
            onClick={setRandomCombo}
          />
          {combo.trim().length > 0 && (
            <Button
              color="primary"
              leftIcon={<BsFillShareFill size={17} />}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://fgc-combo-companion.vercel.app/combo-translator?combo=${encodeURIComponent(
                    combo,
                  )}&game=${GameTypes.TEKKEN_7}`,
                );
                toast.success('The share link was copied to the clipboard');
              }}
            />
          )}
        </div>
      </div>
      {combo ? (
        <ComboTranslation combo={combo} game={GameTypes.TEKKEN_7} />
      ) : (
        <div className="h-[125px]" />
      )}
    </main>
  );
}
