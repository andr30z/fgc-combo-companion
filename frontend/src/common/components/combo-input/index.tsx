import { ChangeEventHandler, FC, useMemo } from 'react';
import { Input } from '../input';
import { PopOver } from '../pop-over';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TEKKEN_7_COMBO_MAP } from '@/common/constants/tekken7-notation-map';
import { GameTypes } from '@/common/types/game-types';
import { STREET_FIGHTER_6_COMBO_MAP } from '@/common/constants/street-fighter-6-notation-map';
import { get } from 'lodash';
import { GUILTY_GEAR_STRIVE_COMBO_MAP } from '@/common/constants/guilty-gear-strive-notation-map';
import { DB_FIGHTERZ_COMBO_MAP } from '@/common/constants/db-fighterz-notation-map';
interface ComboInputInterface {
  combo: string;
  game?: GameTypes;
  setCombo?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const comboMapsDirectionary = {
  [GameTypes.TEKKEN_7]: TEKKEN_7_COMBO_MAP,
  [GameTypes.STREET_FIGHTER_6]: STREET_FIGHTER_6_COMBO_MAP,
  [GameTypes.GUILTY_GEAR_STRIVE]: GUILTY_GEAR_STRIVE_COMBO_MAP,
  [GameTypes.DB_FIGHTERZ]: DB_FIGHTERZ_COMBO_MAP,
} as const;

export const ComboInput: FC<ComboInputInterface> = ({
  combo,
  game = GameTypes.TEKKEN_7,
  setCombo,
  onChange,
}) => {
  const comboMap = useMemo(() => {
    const selectedMap = get(comboMapsDirectionary, game);
    return selectedMap ? Object.keys(selectedMap) : [];
  }, [game]);
  return (
    <Input
      value={combo}
      setValue={setCombo}
      onChange={onChange}
      dataTestId="combo-input-id"
      label={
        <span className="mb-1 flex flex-row items-center gap-2 text-lg font-primary font-semibold text-light">
          Type your combo{' '}
          <PopOver
            trigger={
              <button>
                <AiFillQuestionCircle className="cursor-pointer" size={21} />
              </button>
            }
          >
            <p className="text-secondary font-primary text-lg font-medium">
              Available commands: <br />
              <div>
                {comboMap.map((command, index) => (
                  <span key={command + '_' + index}>
                    {command}
                    {comboMap.length - 1 === index ? '' : ', '}
                  </span>
                ))}
              </div>
              <hr className="my-3" />
              Anything you type inbetween {'{}'} is considered as a comment and
              is not translated, e.g: f,f+2 is translated but {'{df+2}'} is not.{' '}
              <br />
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
  );
};
