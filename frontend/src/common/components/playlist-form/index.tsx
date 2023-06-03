import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../button';
import { Input } from '../input';
import { LoadingBackdrop } from '../loading-backdrop';
import { SelectSearchCombo } from '../select-search-combo';

type PlaylistWithId = Omit<Playlist, 'id' | 'owner' | 'createdAt'> & {
  id?: string | number;
  combos?: Array<Combo>;
};

interface PlaylistFormProps {
  initialValues?: Playlist | null;
  onSuccess?: (playlist: Playlist) => void;
}

export const PlaylistForm: FC<PlaylistFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const initialForm: PlaylistWithId = {
    id: undefined,
    name: '',
    description: '',
    tags: [],
    combos: [],
  };
  const [{ description, name, id, combos }, { onChange, setValue }, onSubmit] =
    useForm<PlaylistWithId>(initialValues ?? initialForm);
  const [isLoading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean();
  return (
    <>
      <form
        onSubmit={onSubmit(async (data) => {
          if (name.trim().length === 0) {
            toast.error('Playlist name is required');
            return;
          }

          startLoading();
          const { error, result } = await promiseResultWithError(
            fgcApi.request<Playlist>({
              url: `${
                id
                  ? FGC_API_URLS.getUpdatePlaylistUrl(id.toString())
                  : FGC_API_URLS.PLAYLISTS
              }`,
              data: {
                ...data.values,
                combos: data.values.combos
                  ? data.values.combos.map((combo) => combo.id)
                  : [],
              },
              method: id ? 'PUT' : 'POST',
            }),
          );
          closeLoading();
          if (error || !result) {
            const errors = error.response?.data?.errors;
            toast.error(
              Array.isArray(errors)
                ? errors.join(', ')
                : 'Something went wrong, please try again later.',
            );
            return;
          }
          if (onSuccess) {
            onSuccess(result.data);
          }
          toast.success(
            id
              ? 'Playlist updated successfully'
              : 'Your playlist was created successfully!',
          );
        })}
        className="w-full flex-1 gap-4 flex flex-col"
      >
        <Input
          required
          value={name}
          onChange={onChange('name')}
          label="Playlist Name"
        />
        <Input
          value={description || ''}
          onChange={onChange('description')}
          label="Description"
        />
        {id === undefined && combos && (
          <SelectSearchCombo
            selectedCombos={combos}
            onClickRemoveCombo={setValue('combos')}
            onFinish={setValue('combos')}
          />
        )}
        <footer className="w-full flex items-center justify-center flex-1 mt-5">
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
