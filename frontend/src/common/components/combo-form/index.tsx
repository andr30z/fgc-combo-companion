'use client';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import { GameTypes } from '@/common/types/game-types';
import { promiseResultWithError } from '@/common/utils/Promises';
import toast from 'react-hot-toast';
import { Button } from '../button';
import { ComboInput } from '../combo-input';
import { ComboTranslation } from '../combo-translation';
import { GameSelect } from '../game-select';
import { Input } from '../input';
import { LoadingBackdrop } from '../loading-backdrop';
import type { FC } from 'react';

type ComboWithId = Omit<Combo, 'id' | 'owner'> & { id?: string | number };
interface ComboFormProps {
  initialValues?: ComboWithId;
  onSuccess?: () => void;
}

export const ComboForm: FC<ComboFormProps> = ({ initialValues, onSuccess }) => {
  const initialForm: ComboWithId = {
    id: '',
    name: '',
    game: GameTypes.TEKKEN_7,
    combo: '',
    description: '',
  };
  const [
    { combo, description, game, name, id },
    { onChange, setValue },
    onSubmit,
  ] = useForm<ComboWithId>(initialValues ?? initialForm);
  const [isLoading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean();
  return (
    <>
      <form
        onSubmit={onSubmit(async (data) => {
          let hasFormError = false;
          if (combo.trim().length === 0) {
            toast.error('Combo is required');
            hasFormError = true;
          }
          if (name.trim().length === 0) {
            toast.error('Name is required');
            hasFormError = true;
          }

          if (hasFormError) {
            return;
          }

          startLoading();
          const { error } = await promiseResultWithError(
            fgcApi.request({
              url: `${
                id
                  ? FGC_API_URLS.getUpdateComboUrl(id.toString())
                  : FGC_API_URLS.COMBOS
              }`,
              data: data.values,
              method: id ? 'PUT' : 'POST',
            }),
          );
          closeLoading();
          if (error) {
            const errors = error.response?.data?.errors;
            toast.error(
              Array.isArray(errors)
                ? errors.join(', ')
                : 'Something went wrong, please try again later.',
            );
            return;
          }
          if (onSuccess) {
            onSuccess();
          }
          toast.success(
            id
              ? 'Combo updated successfully'
              : 'Your combo was created successfully!',
          );
        })}
        className="w-full flex-1 gap-4 flex flex-col"
      >
        <Input
          required
          value={name}
          onChange={onChange('name')}
          label="Combo Name"
        />
        <Input
          value={description || ''}
          onChange={onChange('description')}
          label="Description"
        />
        <GameSelect onSelect={setValue('game')} selectedOption={game} />
        <ComboInput combo={combo} onChange={onChange('combo')} />
        {combo && <ComboTranslation combo={combo} game={game} />}
        <footer className="w-full flex items-center justify-center flex-1">
          <Button
            type="submit"
            text={initialValues?.id ? 'Save Changes' : 'Submit'}
            extraStyles="self-center min-w-[130px]"
          />
        </footer>
      </form>
      <LoadingBackdrop isLoading={isLoading} />
    </>
  );
};
