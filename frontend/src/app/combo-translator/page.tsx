'use client';
import { Button } from '@/common/components/button';
import { ColorPicker } from '@/common/components/color-picker';
import { ComboInput } from '@/common/components/combo-input';
import { ComboTranslation } from '@/common/components/combo-translation';
import { GameSelect } from '@/common/components/game-select';
import { LOCAL_STORAGE_KEYS } from '@/common/constants/local-storage-keys';
import { useBoolean } from '@/common/hooks/boolean';
import { usePageTitle } from '@/common/hooks/page-title';
import { GameTypes } from '@/common/types/game-types';
import { get } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiCollapse, BiExpand } from 'react-icons/bi';
import { BsFillShareFill } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';

const tekken7Combos = [
  'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, b+2,1 S!, {DASH} f,n,d,df+4,1 {CHAR: KAZUYA}',
  'f+1+2 S!  f,f+4,3 {delay last hit}  df+4,2,1+2 {CHAR: FENG WEI}',
  'FC df+1, ws 2,2  S!  wr+2+4 {CHAR: KING}',
  'f,b+2,1, f+3 {DYNAMIC ENTRY} 2, df+3 d {DYNAMIC ENTRY} 2, f+2,1 {SILENT ENTRY} 3+4 S!, f,f,f+3+4 {DYNAMIC ENTRY} 1 f, {SILENT ENTRY} 1 {CHAR: Lars}',
  'ws+2, b+1,2 S!, d,df,f+1, b+2,1 {HOLD} {CHAR: PAUL PHEONIX}',
  'df+3+4, b+3,3 {RELAX} 2,3, b+2,4 S!, {DASH} d+2,3 {RELAX} 3 {CHAR: Eddy}',
  '[ 3,4 ] {BT} b+2,3, b+2,4,2 S!, f,f+3, f,f+4 {CHAR: MASTER RAVEN}',
  'SS 2,1, df+3 df+1  df+3  db+2,4 S!, wr 2+4 {CHAR: ARMOR KING}',
];

const streetFighter6 = [
  'C.LP PC, C.MK > DP HP {CHAR: RYU}',
  's.hp PC > DR > f.hp, c.mp > qcf kk, b.hk > dp hp > LVL3 {CHAR: RYU}',
  's.mp, b.hp > DR > s.hk, c.hp > dp hp {CHAR: RYU}',
  'j.HK, LP > MP > HP xx qcb+PP, qcb+HP xx LVL3 {CHAR: LUKE}',
  'C.MK, QCF HK+MK, MK, DP HP {(1 Charge)} {CHAR: Juri}',
  'DR F+HK, C.MP, QCF MP, F.P, F.P {CHAR: Jamie}',
  'HCB K, S.MP, S.LK, QCF LP, F.LP, F.LP {CHAR: Jamie}',
];

const combos = {
  [GameTypes.TEKKEN_7]: tekken7Combos,
  [GameTypes.STREET_FIGHTER_6]: streetFighter6,
  [GameTypes.STREET_FIGHTER_V]: streetFighter6,
  [GameTypes.GUILTY_GEAR_STRIVE]: streetFighter6,
  [GameTypes.KOF_XV]: streetFighter6,
};
export default function ComboTranslator() {
  const params = useSearchParams();
  const comboParam = params?.get('combo');
  const gameParam = params?.get('game');
  usePageTitle('Combo Translator - FGC');
  const initialGameTypeSelectFromLocalStorage = get(
    GameTypes,
    localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITE_GAME) ||
      GameTypes.TEKKEN_7,
  );
  const gameInitialValue =
    gameParam ??
    initialGameTypeSelectFromLocalStorage ??
    GameTypes.STREET_FIGHTER_6;
  const [game, setGame] = useState(
    get(GameTypes, gameInitialValue)
      ? (gameInitialValue as GameTypes)
      : GameTypes.STREET_FIGHTER_6,
  );
  const [isExpandedView, { toggle }] = useBoolean(
    typeof window !== 'undefined'
      ? localStorage.getItem('@COMBO-TRANSLATOR:IS_EXPANDED_VIEW') === 'true'
      : false,
  );
  const toggleExpandedView = () => {
    toggle();
    localStorage.setItem(
      '@COMBO-TRANSLATOR:IS_EXPANDED_VIEW',
      JSON.stringify(!isExpandedView),
    );
  };
  const [combo, setCombo] = useState(
    comboParam ? decodeURIComponent(comboParam) : '',
  );

  const [bgColor, setBgColor] = useState<string>('#da0037');

  const randomCombos = combos[game] || [];
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
      <GameSelect
        onSelect={(selected) => setGame(selected)}
        selectedOption={game}
      />
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <ComboInput combo={combo} game={game} setCombo={setCombo} />
        <div className="gap-2 flex flex-row flex-wrap justify-center">
          <Button
            dataTestId="random-combo-button"
            color="primary"
            text="Random Combo"
            leftIcon={<FaRandom size={17} />}
            onClick={setRandomCombo}
          />
          {combo.trim().length > 0 && (
            <>
              <Button
                color="primary"
                leftIcon={<BsFillShareFill size={17} />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${
                      process.env.NODE_ENV === 'production'
                        ? 'https://app.fgc-combo-companion.xyz'
                        : 'http://localhost:3000'
                    }/combo-translator?combo=${encodeURIComponent(
                      combo,
                    )}&game=${game}`,
                  );
                  toast.success('The share link was copied to the clipboard');
                }}
              />
              <Button
                rightIcon={
                  isExpandedView ? (
                    <BiCollapse size={18} />
                  ) : (
                    <BiExpand size={18} />
                  )
                }
                title="Expand/Collapse combo view"
                onClick={toggleExpandedView}
              />
              <ColorPicker
                color={bgColor}
                setColor={setBgColor}
                title="Combo background color"
              />
            </>
          )}
        </div>
      </div>
      {combo ? (
        <ComboTranslation
          key={game}
          combo={combo}
          game={game}
          style={{
            backgroundColor: bgColor,
          }}
          className={`${
            isExpandedView
              ? 'w-full min-h-[250px] justify-start content-center '
              : ''
          } `}
          backgroundColor={null}
        />
      ) : (
        <div className="h-[125px]" />
      )}
    </main>
  );
}
