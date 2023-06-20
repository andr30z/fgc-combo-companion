'use client';

import { Input } from '@/common/components/input';
import { useApiQuery } from '@/common/hooks/api-query';
import { useDebounce } from '@/common/hooks/debounce';
import { useForm } from '@/common/hooks/form';
import { usePageTitle } from '@/common/hooks/page-title';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { GameTypes } from '@/common/types/game-types';
import { Playlist } from '@/common/types/playlist';
import { User } from '@/common/types/user';
import { AiOutlineSearch } from 'react-icons/ai';

const gameNameMap: Record<GameTypes, string> = {
  [GameTypes.TEKKEN_7]: 'Tekken 7',
  [GameTypes.STREET_FIGHTER_6]: 'Street Fighter 6',
  [GameTypes.STREET_FIGHTER_V]: 'Street Fighter V',
  [GameTypes.KOF_XV]: 'KOF XV',
  [GameTypes.GUILTY_GEAR_STRIVE]: 'Guilty Gear Strive',
};

interface SearchAllResult {
  users: Array<User>;
  combos: Array<Combo>;
  playlists: Array<Playlist>;
}

export default function SearchPage() {
  usePageTitle('Search - FGC');

  const [{ search, games }, { onChange, set }] = useForm<{
    search: string;
    games: Array<GameTypes>;
  }>({ search: '', games: [] });

  const {
    data: searchResult,
    refetch,
    isFetched,
    isFetching,
  } = useApiQuery<SearchAllResult>({
    apiConfig: {
      url: FGC_API_URLS.SEARCH,
      params: {
        search,
        games,
      },
    },
    key: 'search',
    enabled: false,
  });

  console.log(isFetched);
  const debounceRefetch = useDebounce(refetch);
  const onSelectTag = (tag: GameTypes) => {
    if (games.includes(tag)) {
      return set(
        'games',
        games.filter((t) => t !== tag),
      );
    }
    set('games', [...games, tag]);
  };

  const isInitialMount = !isFetched && !isFetching;
  return (
    <main className="min-h-80vh w-full flex flex-col pt-4">
      <header className="flex flex-col layout-padding-x">
        <Input
          value={search}
          onChange={(event) => {
            set('search', event.target.value);
            debounceRefetch();
          }}
          placeholder="Search for a combo, playlist or user"
          inputGroupClassName="bg-secondary-dark"
          className="bg-secondary-dark text-light"
          height="h-[60px]"
          iconLeft={<AiOutlineSearch className="text-light" size={27} />}
        />
        <div className="flex flex-row flex-wrap gap-2 w-full mt-4">
          {[GameTypes.TEKKEN_7, GameTypes.STREET_FIGHTER_6].map((game) => {
            const isSelected = games.includes(game);
            return (
              <span
                key={game}
                role="button"
                onClick={() => onSelectTag(game)}
                className={`font-primary font-semibold text-xs cursor-pointer hover:bg-opacity-40 select-none p-3 rounded-2xl ${
                  isSelected
                    ? 'bg-light text-secondary'
                    : 'bg-secondary-dark text-light'
                }`}
              >
                {gameNameMap[game]}
              </span>
            );
          })}
        </div>
      </header>

      {isInitialMount && (
        <p className="text-light font-primary text-lg font-semibold layout-padding-x text-center mt-40">
          Nothing to list here
        </p>
      )}
    </main>
  );
}
