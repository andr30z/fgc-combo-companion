'use client';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import { GameTypes } from '@/common/types/game-types';
import { promiseResultWithError } from '@/common/utils/promises';
import toast from 'react-hot-toast';
import { Button } from '../button';
import { ComboInput } from '../combo-input';
import { ComboTranslation } from '../combo-translation';
import { GameSelect } from '../game-select';
import { Input } from '../input';
import { LoadingBackdrop } from '../loading-backdrop';
import type { FC } from 'react';
import { useInvalidateGlobalSearchQueries } from '@/common/hooks/invalidate-global-search-queries';
import { LOCAL_STORAGE_KEYS } from '@/common/constants/local-storage-keys';
import { get } from 'lodash';
import { SelectCharacter } from '../select-character';

type ComboWithId = Omit<Combo, 'id' | 'owner'> & { id?: string | number };
interface ComboFormProps {
  initialValues?: ComboWithId;
  onSuccess?: () => void;
  onSuccessUrl?: string;
}

export const ComboForm: FC<ComboFormProps> = ({
  initialValues,
  onSuccess,
  onSuccessUrl,
}) => {
  const initialGameTypeSelect = get(
    GameTypes,
    localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITE_GAME) ||
      GameTypes.TEKKEN_7,
  );
  const initialForm: ComboWithId = {
    id: '',
    name: '',
    game: initialGameTypeSelect || GameTypes.TEKKEN_7,
    combo: '',
    description: '',
    character: '',
    totalDamage: '',
  };
  const [
    { combo, description, game, name, id, totalDamage, character },
    { onChange, setValue, setValues },
    onSubmit,
  ] = useForm<ComboWithId>(initialValues ?? initialForm);
  const [isLoading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean();
  const invalidateQueries = useInvalidateGlobalSearchQueries();
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
          const defaultUrl = id
            ? FGC_API_URLS.getUpdateComboUrl(id.toString())
            : FGC_API_URLS.COMBOS;
          const { error } = await promiseResultWithError(
            fgcApi.request({
              url: onSuccessUrl ? onSuccessUrl : defaultUrl,
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
          invalidateQueries();
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
        <Input
          value={totalDamage || ''}
          onChange={onChange('totalDamage')}
          label="Total Damage"
        />
        <SelectCharacter
          game={game}
          value={character ?? ''}
          onSelectValue={setValue('character')}
        />
        <GameSelect
          onSelect={(game) => {
            setValues({ character: '', game });
          }}
          selectedOption={game}
          alwaysShowScroll
        />
        <ComboInput combo={combo} onChange={onChange('combo')} />
        {combo && (
          <ComboTranslation
            key={`gameselectkey_${id ?? ''}-${game}`}
            combo={combo}
            game={game}
          />
        )}
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
