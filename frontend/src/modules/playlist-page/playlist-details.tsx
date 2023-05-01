'use client';
import { ComboListItems } from '@/common/components/combo-list-items';
import { useApiQuery } from '@/common/hooks/api-query';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { PlaylistWithCombos } from '@/common/types/playlist';
import { FC } from 'react';
const TEN_MINUTES = 10 * 60 * 1000;
export const PlaylistDetails: FC<{
  playlistInitialData?: PlaylistWithCombos;
  playlistId: string;
}> = ({ playlistInitialData, playlistId }) => {
  const { data: playlistDetails, isLoading } = useApiQuery<PlaylistWithCombos>({
    key: ['PLAYLIST_DETAILS', playlistId],
    apiConfig: {
      url: `${FGC_API_URLS.PLAYLISTS}/${playlistId}`,
    },
    staleTime: TEN_MINUTES,
    initialData: playlistInitialData,
  });
  console.log(playlistDetails, isLoading);
  const orderedCombos = playlistDetails?.playlistCombos?.sort((a, b) => {
    return a.position - b.position;
  });
  const combos = orderedCombos?.map((playlistCombo) => playlistCombo.combo);
  return (
    <div className="w-full h-full min-h-80vh flex flex-col-reverse md:flex-row justify-between gap-2 layout-padding-x ">
      <main className="flex-1">
        <header className="w-full flex flex-col items-start gap-2">
          <h1 className="text-6xl text-light font-primary font-bold">
            {playlistDetails?.name}
          </h1>
          {playlistDetails?.description && (
            <p className="text-sm text-[#c3c3c3c3] font-primary text-md">
              {playlistDetails?.description}
            </p>
          )}
          <p className="text-[#c3c3c3c3] font-primary text-md">
            {playlistDetails?.owner.name} - {combos?.length} combo
            {combos?.length === 1 ? '' : 's'}
          </p>
        </header>
        <ComboListItems useCreateComboButtonWhenEmpty={false} items={combos} />
      </main>
      <aside className="flex-[0.3]">
        <h5 className="text-xl text-light font-primary font-bold">
          Other playlists
        </h5>
      </aside>
    </div>
  );
};
