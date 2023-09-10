'use client';
import { Button } from '@/common/components/button';
import { ColorPicker } from '@/common/components/color-picker';
import { ComboInput } from '@/common/components/combo-input';
import { ComboTranslation } from '@/common/components/combo-translation';
import { CopyTextButton } from '@/common/components/copy-text-button';
import { DownloadComponentImageButton } from '@/common/components/download-component-image-button';
import { GameSelect } from '@/common/components/game-select';
import { LOCAL_STORAGE_KEYS } from '@/common/constants/local-storage-keys';
import { useBoolean } from '@/common/hooks/boolean';
import { usePageTitle } from '@/common/hooks/page-title';
import { GameTypes } from '@/common/types/game-types';
import { get } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
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

const guiltyGearStrive = [
  '{CHAR: Faust} 5[D]8 j.D j.H 9 j.D delay j.D j.H 9 j.H{x2}',
  '{CHAR: Nagoriyuki} 632146S > 66RRC~j.H > [4] > c.S > 2H > 236K > 623HH WS > 236K > 6H',
  '{CHAR: Potemkin} CH 5H > 236P > 66PRC, c.S > 214H, 632146K~P',
  '{CHAR: Potemkin} CH 5H > 236P > 66PRC, c.S > 214H, 632146K~P',
  '{CHAR: Chipp Zanuff} CH 6H > 66 > c.S > 6H > 66 > 2K > 6H > 236S~236S~236K~P',
  '{CHAR: Sol Badguy} 5[D] > 8, j.D > jc, j.D > j.S > j.D > j.S > jc, j.DD',
  '{CHAR: Ky Kiske} c.S > 6H > delay > 214S, 665K/2K > 6H > 623H, 2K/c.S WS 623H/214S',
  '{CHAR: ZATO-1} 236H / 214H~]H[, CH 2H > 214S, delay ]S[, delay 2H > 214K, [6]c.S > [3][2S] > [3][2H], delay ]S[,]H[, delay 2H > 214K, c.S > 2S > 2H > 22H',
];

const dragonBallFighterZ = [
  '{CHAR: Goku} 2M > 5M > jc > j.MLL2H > SD > j.MLL2H > jc > j.LLL',
  '{CHAR: Android 17} 5M > 2M > 3H > 236L~MMM~H > 214M~MMM~2S',
  '{CHAR: BEERUS} {CORNER COMBO} 2M > 5M > jc.MLL > jc.LL > j.236M > DR',
  '{CHAR: Majin Buu} 2M > 5M > 5H > SD > j.M > j.H > 214L > j.L > j.L > jump > j.M > j.L > j.2H > j.S > 236L',
  '{CHAR: GT Goku} 2M > 5M > 2S > 5L > jump M > j.L > j.L > jump > j.M > j.H > 214L > delay dr',
  '{CHAR: Adult Gohan} 2M > 5H > SD > 236[L] > 5L(2) > 3H > jc.LL2H > jc.LLS > SD > j.LLS > 214L',
  '{CHAR: Vegeta} {CORNER COMBO} 2L/5L > 5M > 2M > 236M > 2M > 5M > jc.ML > jc.MS, j.LLS, j.LL delay S > 5L > 5S(2) > 5H > SD > j.MS > 5LLL > 214M',
  '{CHAR: Broly} {CORNER COMBO} 5LL > 5M > 2M > 236S > 5LL > 5M > 5[S](3) > 5H > SD > j.ML > jc.LL > j.214M > Vanish > delay 214LM',
  '{CHAR: Cell} 2M > 5M > jc.MLL > jc.MLL2H > SD > j.LLLS > j.236L',
];

const combos = {
  [GameTypes.TEKKEN_7]: tekken7Combos,
  [GameTypes.GUILTY_GEAR_STRIVE]: guiltyGearStrive,
  [GameTypes.DB_FIGHTERZ]: dragonBallFighterZ,
  [GameTypes.STREET_FIGHTER_6]: streetFighter6,
  [GameTypes.STREET_FIGHTER_V]: streetFighter6,
  [GameTypes.KOF_XV]: streetFighter6,
  [GameTypes.MORTAL_KOMBAT_1]: streetFighter6,
};
export default function ComboTranslator() {
  const params = useSearchParams();
  const comboTranslatorRef = useRef<HTMLDivElement>(null);
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
              <CopyTextButton
                isAppUrlCopy
                buttonIcon={<BsFillShareFill size={17} />}
                textToCopy={`/combo-translator?combo=${encodeURIComponent(
                  combo,
                )}&game=${game}`}
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
              <DownloadComponentImageButton<HTMLDivElement>
                componentRef={comboTranslatorRef}
                title="Download combo"
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
          ref={comboTranslatorRef}
          key={game}
          combo={combo}
          game={game}
          style={{
            backgroundColor: bgColor,
          }}
          className={`${
            isExpandedView
              ? 'w-full min-h-[250px] justify-center content-center '
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
