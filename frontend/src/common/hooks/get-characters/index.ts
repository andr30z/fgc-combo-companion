import { FGC_API_URLS } from '@/common/services/fgc-api';
import { GameTypes } from '@/common/types/game-types';
import { useApiQuery } from '../api-query';
import { GameCharacter } from '@/common/types/game-characters';
import { useMemo } from 'react';
interface GameCharacters {
  characters: Array<GameCharacter>;
}
export function useGetCharacters({ game }: { game: GameTypes }) {
  const { data, isLoading } = useApiQuery<GameCharacters>({
    apiConfig: {
      url: FGC_API_URLS.getCharactersByGame(game),
      method: 'get',
    },
    key: ['characters', game],
    enabled: true,
  });

  const getCharacterName = (character: string) => {
    return data?.characters?.find((c) => c.code === character)?.name;
  };

  const orderedCharacters = useMemo(
    () =>
      data?.characters?.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    [data?.characters],
  );

  return { characters: orderedCharacters, isLoading, getCharacterName };
}
