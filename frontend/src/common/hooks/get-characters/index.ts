import { FGC_API_URLS } from '@/common/services/fgc-api';
import { GameTypes } from '@/common/types/game-types';
import { useApiQuery } from '../api-query';
import { GameCharacter } from '@/common/types/game-characters';
interface GameCharacters {
  characters: Array<GameCharacter>;
}
export function useGetCharacters({ game }: { game: GameTypes }) {
  const { data, isLoading } = useApiQuery<GameCharacters>({
    apiConfig: {
      url: FGC_API_URLS.getCharactersByGame(game),
      method: 'get',
    },
    key: ['charactersa', game],
    enabled: true,
  });

  const getCharacterName = (character: string) => {
    return data?.characters?.find((c) => c.code === character)?.name;
  };

  return { characters: data?.characters, isLoading, getCharacterName };
}
