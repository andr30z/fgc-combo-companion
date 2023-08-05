import { GameTypes } from '@/common/types/game-types';
import { Select, SelectProps } from '../select';
import { GAME_CHARACTERS_MAP } from '@/common/constants/game-characters';

export const SelectCharacter: React.FC<
  Omit<SelectProps, 'options'> & { game: GameTypes }
> = (props) => {
  return (
    <div className="w-full flex flex-col">
      <label className="mb-1 font-semibold text-lg text-light">Character</label>
      <Select
        key={`game_select_character_${props.game}`}
        {...props}
        options={GAME_CHARACTERS_MAP.get(props.game) ?? []}
      />
    </div>
  );
};
