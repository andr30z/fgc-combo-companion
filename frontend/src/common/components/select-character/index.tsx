import { useGetCharacters } from '@/common/hooks/get-characters';
import { GameTypes } from '@/common/types/game-types';
import { Select, SelectProps } from '../select';

export const SelectCharacter: React.FC<
  Omit<SelectProps, 'options'> & { game: GameTypes }
> = (props) => {
  const { characters, isLoading } = useGetCharacters({ game: props.game });
  return (
    <div className="w-full flex flex-col">
      <label className="mb-1 font-semibold text-lg text-light">Character</label>
      <Select
        key={`game_select_character_${props.game}`}
        {...props}
        isLoadingOptions={isLoading}
        options={
          characters?.map((c) => ({
            label: c.name,
            value: c.code,
          })) ?? []
        }
      />
    </div>
  );
};
