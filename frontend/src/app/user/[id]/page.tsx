import { Button } from '@/common/components/button';
import { Tabs } from '@/common/components/tabs';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import type { User } from '@/common/types/user';
import { promiseResultWithError } from '@/common/utils/promises';
import { UserCombos } from '@/modules/user-page/user-combos';
import { UserInfo } from '@/modules/user-page/user-info';
import { UserPlaylists } from '@/modules/user-page/user-playlists';
type PageProps = { params?: { id: string | undefined } };

export async function generateMetadata({ params }: PageProps) {
  const fgcApiInstance = getFgcApiInstance();
  const { result, error } = await promiseResultWithError(
    fgcApiInstance.get<User>(`${FGC_API_URLS.USERS}/${params?.id}`),
  );
  if (error) {
    return {
      title: 'User Details - FGC Combo Companion',
    };
  }
  return {
    title: `${result.data.name} - FGC Combo Companion`,
    description: `FGC Combo Companion - User - ${result.data.name}`,
  };
}

export default async function UserPage({ params }: PageProps) {
  const id = params?.id;
  const fgcApiInstance = getFgcApiInstance();
  const { result, error } = await promiseResultWithError(
    fgcApiInstance.get<{
      user: User;
      combos: FGCApiPaginationResponse<Combo>;
      playlists: FGCApiPaginationResponse<Playlist>;
    }>(`${FGC_API_URLS.USER_PUBLIC_PROFILE}/${id}`),
  );

  const is404 = error?.response?.status === 404;

  return (
    <main className="w-full h-full min-h-80vh flex flex-col items-center gap-2 pt-10">
      {is404 ? (
        <div className="flex-1 items-center justify-center flex flex-col gap-4">
          <h1 className="text-5xl font-primary text-light text-center font-extrabold">
            User not found
          </h1>
          <Button
            renderAsInnerLink
            href="/dashboard/combos"
            text="Go to dashboard"
          />
        </div>
      ) : (
        <>
          <UserInfo userId={id} user={result?.data.user} />
          <Tabs
            tabs={[
              { label: 'Combos', id: 'combos' },
              { label: 'Playlists', id: 'playlists' },
            ]}
            listContainerClassName="layout-padding-x"
          >
            <UserCombos initialComboData={result?.data.combos} userId={id} />
            <UserPlaylists playlists={result?.data.playlists} userId={id} />
          </Tabs>
        </>
      )}
    </main>
  );
}
