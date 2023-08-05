import { Button } from '@/common/components/button';
import { UserPreviewLink } from '@/common/components/user-preview-link';
import { getCharacterName } from '@/common/constants/game-characters';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { promiseResultWithError } from '@/common/utils/promises';
import { ComboDisplay } from '@/modules/combo-page/combo-display';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
type PageProps = { params?: { id: string | undefined } };

function getComboDetails(id: string) {
  const fgcApi = getFgcApiInstance();
  return promiseResultWithError(
    fgcApi.get<Combo>(`${FGC_API_URLS.COMBOS}/${id}`),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { result, error } = await getComboDetails(params?.id ?? '');
  if (error) {
    return {
      title: 'FGC - Playlist Details',
    };
  }
  const combo = result.data;
  const url = `https://app.fgc-combo-companion.xyz/combo/${combo.id}`;
  return {
    title: `Combo - ${combo.name}`,
    description: `FGC Combo Companion - ${combo.owner.name} - Combo - ${combo.name}`,
    twitter: {
      title: combo.name,
      description: 'FGC Combo Companion',
      creator: combo.owner.name,
      siteId: combo.id,
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
      title: combo.name,
      description: combo.description ?? undefined,
      url,
      images: '/metatag-logo.png',
      siteName: 'FGC Combo Companion',
    },
  };
}

export default async function ComboPage({ params }: PageProps) {
  const id = params?.id;
  const { error, result } = await getComboDetails(id || '');
  const isLoggedUser = cookies().has('accessToken');
  if (error) {
    return (
      <main className="w-full min-h-[30vh] flex items-center justify-center flex-col">
        <h1 className="text-light font-primary font-bold text-3xl">
          {error?.response?.status === 404
            ? 'Combo not found'
            : 'Something went wrong. Try again later.'}
        </h1>
        <Button
          text="Home"
          href={isLoggedUser ? '/dashboard/combos' : '/login'}
          renderAsInnerLink
        />
      </main>
    );
  }
  const combo = result.data;
  return (
    <main className="layout-padding-x h-80vh min-h-400 flex flex-col justify-center gap-2">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-light font-primary font-bold text-3xl">
          {combo.name}
        </h1>
        <UserPreviewLink
          prefix="Created by"
          id={combo.owner.id}
          name={combo.owner.name}
        />
        {combo.totalDamage || combo.character ? (
          <span className="text-sub-info font-primary text-sm">
            {combo.character
              ? getCharacterName(combo.game, combo.character)
              : ''}
            {combo.totalDamage
              ? ` ${combo.character ? '-' : ''} ${combo.totalDamage} Damage`
              : null}
          </span>
        ) : null}
        <p className="text-light font-primary font-normal text-sm">
          {combo.description}
        </p>
      </div>

      <ComboDisplay combo={combo.combo} game={combo.game} />
    </main>
  );
}
