import { Tabs } from '@/common/components/tabs';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { promiseResultWithError } from '@/common/utils/promises';
import { UserCombos } from '@/modules/user-page/user-combos';
import { UserInfo } from '@/modules/user-page/user-info';
import { UserPlaylists } from '@/modules/user-page/user-playlists';
import { cookies } from 'next/headers';
type PageProps = { params?: { id: string | undefined } };

export default async function UserPage({ params }: PageProps) {
  const id = params?.id;
  const fgcApiInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const [{ result: user }, { result: userCombos }, { result: userPlaylists }] =
    await Promise.all([
      promiseResultWithError(
        fgcApiInstance.get<User>(`${FGC_API_URLS.USERS}/${id}`),
      ),
      promiseResultWithError(
        fgcApiInstance.get(`${FGC_API_URLS.USER_COMBOS}/${id}`, {
          params: {
            sort: 'id,desc',
            siz: 10,
          },
        }),
      ),
      promiseResultWithError(
        fgcApiInstance.get(`${FGC_API_URLS.USER_PLAYLISTS}/${id}`, {
          params: {
            sort: 'id,desc',
            siz: 10,
          },
        }),
      ),
    ]);

  return (
    <main className="w-full h-full min-h-80vh flex flex-col items-center gap-2 pt-10">
      <UserInfo user={user?.data} />
      <Tabs
        tabs={[
          { label: 'Combos', id: 'combos' },
          { label: 'Playlists', id: 'playlists' },
        ]}
        listContainerClassName="layout-padding-x"
      >
        <UserCombos initialComboData={userCombos?.data} userId={id} />
        <UserPlaylists playlists={userPlaylists?.data} userId={id} />
      </Tabs>
    </main>
  );
}
