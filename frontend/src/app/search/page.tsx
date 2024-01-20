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
import { LoadingSearchSkeleton } from '@/modules/search-page/loading-search-skeleton';
import { flushSync } from 'react-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const gameNameMap: Record<GameTypes, string> = {
  [GameTypes.TEKKEN_7]: 'Tekken 7',
  [GameTypes.TEKKEN_8]: 'Tekken 8',
  [GameTypes.STREET_FIGHTER_6]: 'Street Fighter 6',
  [GameTypes.STREET_FIGHTER_V]: 'Street Fighter V',
  [GameTypes.KOF_XV]: 'KOF XV',
  [GameTypes.GUILTY_GEAR_STRIVE]: 'Guilty Gear Strive',
  [GameTypes.DB_FIGHTERZ]: 'Dragon Ball FighterZ',
  [GameTypes.MORTAL_KOMBAT_1]: 'Mortal Kombat 1',
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
    isLoading,
    isFetched,
  } = useApiQuery<SearchAllResult>({
    apiConfig: {
      url: `${FGC_API_URLS.SEARCH}?search=${encodeURIComponent(search)}${games
        .map((g) => `&games=${g}`)
        .join('')}`,
    },
    key: ['search-all'],
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

  const hasCombos = searchResult?.combos && searchResult?.combos.length > 0;

  const hasUsers = searchResult?.users && searchResult?.users.length > 0;
  const hasPlaylists =
    searchResult?.playlists && searchResult?.playlists.length > 0;

  const listContent =
    hasCombos || hasUsers || hasPlaylists ? (
      <>
        {hasCombos && <ListCombos combos={searchResult?.combos} />}
        <div className="max-w-full flex flex-col md:flex-row gap-2 layout-padding-x mt-4 mb-2">
          {hasUsers && <ListUsers users={searchResult?.users} />}
          {hasPlaylists && <ListPlaylists playlists={searchResult.playlists} />}
        </div>
      </>
    ) : (
      <div className="w-full flex justify-center items-center layout-padding-x h-[450px]">
        <h1 className="text-light text-lg font-bold">
          Nothing to show here ;-;
        </h1>
      </div>
    );
  return (
    <main className="min-h-80vh w-full flex flex-col pt-4 relative">
      <header className="flex flex-col layout-padding-x sticky top-0 z-10 bg-dark p-2">
        <Input
          value={search}
          onChange={(event) => {
            const value = event.target.value;
            flushSync(() => {
              set('search', value);
            });
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
          {[
            GameTypes.TEKKEN_7,
            GameTypes.STREET_FIGHTER_6,
            GameTypes.GUILTY_GEAR_STRIVE,
            GameTypes.DB_FIGHTERZ,
          ].map((game) => {
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

      {isLoading && !isFetched ? <LoadingSearchSkeleton /> : listContent}
    </main>
  );
}
