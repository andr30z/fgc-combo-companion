import { Button } from '@/common/components/button';
import { Tabs } from '@/common/components/tabs';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import type { User } from '@/common/types/user';
import type { UserProfile } from '@/common/types/user-profile';
import { promiseResultWithError } from '@/common/utils/promises';
import { UserCombos } from '@/modules/user-page/user-combos';
import { UserInfo } from '@/modules/user-page/user-info';
import { UserPlaylists } from '@/modules/user-page/user-playlists';
type PageProps = { params?: { id: string | undefined } };
export const revalidate = 0;

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
  const user = result.data;
  const url = `https://app.fgc-combo-companion.xyz/user/${user.id}`;
  return {
    title: `${result.data.name} - FGC Combo Companion`,
    description: `FGC Combo Companion - User - ${result.data.name}`,
    twitter: {
      title: user.name,
      description: 'FGC Combo Companion',
      creator: user.name,
      siteId: user.id,
      site: url,
      images: '/metatag-logo.png',
      card: 'summary',
      // players: {
      //   height: 20,
      //   width: 20,
      //   playerUrl: url,
      //   streamUrl: url,
      // },
    },
    openGraph: {
      type: 'website',
      title: user.name,
      description: user.bio ?? undefined,
      url,
      images: '/metatag-logo.png',
      siteName: 'FGC Combo Companion',
    },
  };
}

export default async function UserPage({ params }: PageProps) {
  const id = params?.id;
  const fgcApiInstance = getFgcApiInstance();
  const { result, error } = await promiseResultWithError(
    fgcApiInstance.get<UserProfile>(
      `${FGC_API_URLS.USER_PUBLIC_PROFILE}/${id}`,
    ),
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
