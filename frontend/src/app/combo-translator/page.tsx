'use client';
import { Button } from '@/common/components/button';
import { ComboTranslation } from '@/common/components/combo-translation';
import { Input } from '@/common/components/input';
import { PopOver } from '@/common/components/pop-over';
import { TEKKEN_7_COMBO_MAP } from '@/common/constants/ComboMappers';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';

const Card: React.FC<{
  url: string;
  showSoonMessage?: boolean;
  selected?: boolean;
}> = ({ url, showSoonMessage = false, selected = false }) => {
  return (
    <div
      className={`group overflow-hidden cursor-pointer relative rounded-lg ${
        selected ? 'border-4 border-solid border-primary' : ''
      }`}
    >
      <Image
        alt="next step"
        className="h-full scale-100 group-hover:scale-110 ease-in duration-500"
        height={230}
        src={url}
        width={300}
      />
      {!selected && (
        <div className="absolute top-0 bg-primary h-full w-full opacity-30" />
      )}
      {showSoonMessage && (
        <div className="absolute top-0 w-full h-full flex items-center justify-center">
          <h4 className="text-light font-primary font-semibold text-sm sm:text-lg bg-dark p-1 rounded-lg opacity-60">
            SOON
          </h4>
        </div>
      )}
    </div>
  );
};

export default function ComboTranslator() {
  const [combo, setCombo] = useState('');

  const randomCombos = [
    'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, B+2,1 S!, {DASH} f,n,d,df+4,1 {CHAR: KAZUYA}',
    'f+1+2 S!  f,f+4,3 {delay last hit}  df+4,2,1+2 {CHAR: FENG WEI}',
    'FC df+1, ws+2,2  S!  wr+2+4 {CHAR: KING}',
    'f,b+2,1, f+3 {DYNAMIC ENTRY} 2, df+3 d {DYNAMIC ENTRY} 2, f+2,1 {SILENT ENTRY} 3+4 S!, f,f,f+3+4 {DYNAMIC ENTRY} 1 f, {SILENT ENTRY} 1 {CHAR: Lars}',
    'ws+2, b+1,2 S!, d,df,f+1, b+2,1 {HOLD} {CHAR: PAUL PHEONIX}',
    'df+3+4, b+3,3 {RELAX} 2,3, b+2,4 S!, d+2,3 {RELAX} 3 {CHAR: Eddy}',
    '[ 3,4 ] {BT} b+2,3, b+2,4,2 S!, f,f+3, f,f+4 {CHAR: MASTER RAVEN}',
    'SS 2,1, df+3 df+1  df+3  db+2,4 S! wr+2+4 {CHAR: ARMOR KING}',
  ];

  const setRandomCombo = (): void => {
    const randomCombo =
      randomCombos[Math.floor(Math.random() * randomCombos.length)];
    if (randomCombo === combo) {
      return setRandomCombo();
    }
    setCombo(randomCombo);
  };

  const comboMap = Object.keys(TEKKEN_7_COMBO_MAP);
  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center justify-center px-10 gap-24">
      <div className="flex flex-col text-light w-full">
        <label className="mb-4">
          <span className="px-4 py-2 font-semibold text-sm bg-secondary text-light rounded-full shadow-sm font-primary font-black">
            Select a game:
          </span>
        </label>
        <div className="flex flex-row gap-4 w-full">
          <Card url="/tekken7/tekken7-select.webp" selected />
          <Card
            url="/guilty-gear-strive/guilty-gear-strive-select.jpg"
            showSoonMessage
            selected={false}
          />
          <Card
            url="/street-fighter-5/street-fighter-5-select.jpg"
            showSoonMessage
            selected={false}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <Input
          value={combo}
          setValue={setCombo}
          dataTestId="combo-input-id"
          label={
            <span className="mb-1 flex flex-row items-center gap-2 text-xl font-primary font-semibold text-light">
              Type your combo{' '}
              <PopOver
                trigger={
                  <button>
                    <AiFillQuestionCircle
                      className="cursor-pointer"
                      size={21}
                    />
                  </button>
                }
              >
                <p className="text-secondary font-primary text-lg font-medium">
                  Available commands: <br />
                  <div>
                    {comboMap.map((command, index) => (
                      <span key={command}>
                        {command.toLocaleLowerCase()}
                        {comboMap.length - 1 === index ? '' : ', '}
                      </span>
                    ))}
                  </div>
                  <hr className="my-3" />
                  Anything you type between {'"{}"'} is considered as a comment
                  and is not translated, e.g: f,f+2 is translated but {'{df+2}'}{' '}
                  is not. <br />
                </p>
              </PopOver>
            </span>
          }
          placeholder="Type your combo..."
          height="min-h-[100px] h-[10vh]"
          width="w-full"
          className="text-xm md:text-xl font-semibold text-secondary"
          inputProps={{ autoComplete: 'none', autoCorrect: 'none' }}
        />
        <Button
          dataTestId="random-combo-button"
          color="primary"
          text="Random Combo"
          leftIcon={<FaRandom size={17} />}
          onClick={setRandomCombo}
        />
      </div>
      <ComboTranslation combo={combo} game={GameTypes.TEKKEN_7} />
    </div>
  );
}
