'use client';
import { Pagination } from '@/common/components/pagination';
import { PlaylistList } from '@/common/components/playlist-list';
import { TabContent } from '@/common/components/tabs';
import { usePaginatedSearch } from '@/common/hooks/paginated-search';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { Playlist } from '@/common/types/playlist';

interface UserPlaylistsProps {
  playlists?: FGCApiPaginationResponse<Playlist> | null;
  userId?: string;
}

export const UserPlaylists: React.FC<UserPlaylistsProps> = ({
  playlists,
  userId,
}) => {
  const { data: playlistData, onSelectPage } = usePaginatedSearch<Playlist>({
    queryKey: ['user-details-playlists', userId],
    url: FGC_API_URLS.USER_PLAYLISTS + '/' + userId,
    initialData: playlists as FGCApiPaginationResponse<Playlist>,
    enabled: !!userId,
    pageSize: 10,
  });

  return (
    <TabContent
      className="w-full layout-padding-x flex flex-col items-center justify-center"
      value="playlists"
    >
      <PlaylistList showEditButton={false} items={playlistData?.data ?? []} />
      {playlistData && (
        <div className="mt-5 w-full">
          <Pagination
            showTotal
            pagination={playlistData}
            onSelectPage={onSelectPage}
          />
        </div>
      )}
    </TabContent>
  );
};
