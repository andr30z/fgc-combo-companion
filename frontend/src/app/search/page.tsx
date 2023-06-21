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
import { ListCombos } from '@/modules/search-page/list-combos';
import { ListPlaylists } from '@/modules/search-page/list-playlists';
import { ListUsers } from '@/modules/search-page/list-users';
import { flushSync } from 'react-dom';
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

  const [{ search, games }, { set }] = useForm<{
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
      url: `${FGC_API_URLS.SEARCH}?search=${encodeURIComponent(search)}${games
        .map((g) => `&games=${g}`)
        .join('')}`,
    },
    key: ['search', search, ...games],
    enabled: false,
  });

  const debounceRefetch = useDebounce(refetch);
  const onSelectTag = (tag: GameTypes) => {
    const update = () => {
      if (games.includes(tag)) {
        return set(
          'games',
          games.filter((t) => t !== tag),
        );
      }
      set('games', [...games, tag]);
    };
    if (search.trim().length > 0) {
      flushSync(update);
      refetch();
      return;
    }
    update();
  };

  const isInitialMount = !isFetched && !isFetching;
  return (
    <main className="min-h-80vh w-full flex flex-col pt-4">
      <header className="flex flex-col layout-padding-x">
        <Input
          value={search}
          onChange={(event) => {
            const value = event.target.value;
            set('search', value);
            if (value.trim().length > 0) {
              debounceRefetch();
            }
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
                    ? 'bg-light text-secondary hover:text-dark'
                    : 'bg-secondary-dark text-light hover:text-sub-info'
                }`}
              >
                {gameNameMap[game]}
              </span>
            );
          })}
        </div>
      </header>

      <div className="w-full flex flex-col md:flex-row gap-4 layout-padding-x mt-10">
        {searchResult?.users && searchResult.users.length > 0 && (
          <ListUsers users={searchResult?.users} />
        )}
        {searchResult?.playlists && searchResult.playlists.length > 0 && (
          <ListPlaylists playlists={searchResult.playlists} />
        )}
      </div>
      {searchResult?.combos && searchResult.combos.length && (
        <ListCombos combos={searchResult?.combos} />
      )}
    </main>
  );
}
