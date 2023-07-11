import { Button } from '@/common/components/button';
import { ComboTranslation } from '@/common/components/combo-translation';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { promiseResultWithError } from '@/common/utils/promises';
import { cookies } from 'next/headers';
type PageProps = { params?: { id: string | undefined } };
export default async function ComboPage({ params }: PageProps) {
  const id = params?.id;
  const fgcApi = getFgcApiInstance();
  const { error, result } = await promiseResultWithError(
    fgcApi.get<Combo>(`${FGC_API_URLS.COMBOS}/${id}`),
  );

  const isLoggedUser = cookies().has('accessToken');
  if (error) {
    return (
      <main className="w-full min-h-[30vh] flex items-center justify-center">
        <h1 className="text-light font-primary font-bold text-3xl">
          {error?.response?.status === 404
            ? 'Combo not found'
            : 'Something went wrong. Try again later.'}
        </h1>
        <Button
          text="Home"
          href={isLoggedUser ? '/dashboard-combos' : '/login'}
          renderAsInnerLink
        />
      </main>
    );
  }
  const combo = result.data;
  return (
    <div className="layout-padding-x min-h-80vh flex flex-col justify-center gap-2">
      <div className="w-full flex gap-2">
        <h1 className="text-light font-primary font-bold text-3xl">
          {combo.name}
        </h1>
        <p className="text-light font-primary font-bold text-lg">
          {combo.description}
        </p>
      </div>

      <ComboTranslation
        className="justify-self-center"
        game={combo.game}
        combo={combo.combo}
      />
    </div>
  );
}
