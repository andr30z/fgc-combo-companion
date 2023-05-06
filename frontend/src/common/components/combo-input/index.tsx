import type { ChangeEventHandler, FC } from 'react';
import { Input } from '../input';
import { PopOver } from '../pop-over';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TEKKEN_7_COMBO_MAP } from '@/common/constants/ComboMappers';
interface ComboInputInterface {
  combo: string;
  setCombo?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const comboMap = Object.keys(TEKKEN_7_COMBO_MAP);

export const ComboInput: FC<ComboInputInterface> = ({
  combo,
  setCombo,
  onChange,
}) => {
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
                  <span key={command}>
                    {command.toLocaleLowerCase()}
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
