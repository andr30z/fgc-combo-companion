'use client';

import { Button } from '@/common/components/button';
import { ComboInput } from '@/common/components/combo-input';
import { GameSelect } from '@/common/components/game-select';
import { Input } from '@/common/components/input';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { WithProtectedRoute } from '@/common/components/with-protected-route';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { GameTypes } from '@/common/types/game-types';
import { promiseResultWithError } from '@/common/utils/Promises';
import { toast } from 'react-hot-toast';
import type { Metadata } from 'next';
import type { Combo } from '@/common/types/combo';
import { ComboTranslation } from '@/common/components/combo-translation';

export const metadata: Metadata = {
  title: 'FGC - Create Combo',
};
export default WithProtectedRoute(function CreateComboPage() {
  const [
    { combo, description, game, name, id },
    { onChange, setValue },
    onSubmit,
  ] = useForm<Omit<Combo, 'id'> & { id?: string | number }>({
    id: '',
    name: '',
    game: GameTypes.TEKKEN_7,
    combo: '',
    description: '',
  });
  return (
    <main className="w-full h-full min-h-80vh flex flex-col items-center w-full px-10">
      <header className="w-full h-[100px] mt-10">
        <h1 className="text-light text-3xl font-primary">Combo Form</h1>
      </header>
      <form
        onSubmit={onSubmit(async (data) => {
          const { error } = await promiseResultWithError(
            fgcApi.post(
              `${FGC_API_URLS.COMBOS}${id ? '/' + id : ''}`,
              data.values,
            ),
          );
          if (error) {
            const errors = error.response?.data?.errors;
            toast.error(
              Array.isArray(errors)
                ? errors.join(', ')
                : 'Something went wrong, please try again later.',
            );
          }

          toast.success('Your com was created successfully!');
        })}
        className="w-full flex-1 gap-2 flex flex-col"
      >
        <Input
          required
          value={name}
          onChange={onChange('name')}
          label="Combo Name"
        />
        <Input
          required
          value={description || ''}
          onChange={onChange('description')}
          label="Description"
        />
        <GameSelect onSelect={setValue('game')} selectedOption={game} />
        <ComboInput combo={combo} onChange={onChange('combo')} />
        {combo && <ComboTranslation combo={combo} game={game} />}
        <footer className="w-full flex items-center justify-center flex-1">
          <Button type="submit" text="Submit" extraStyles="self-center" />
        </footer>
      </form>
      <LoadingBackdrop isLoading={false} />
    </main>
  );
});
