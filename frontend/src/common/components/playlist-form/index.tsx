import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/Promises';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../button';
import { Input } from '../input';
import { LoadingBackdrop } from '../loading-backdrop';

type PlaylistWithId = Omit<Playlist, 'id' | 'owner' | 'createdAt'> & {
  id?: string | number;
};

interface PlaylistFormProps {
  initialValues?: Playlist;
  onSuccess?: () => void;
}

export const PlaylistForm: FC<PlaylistFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const initialForm: PlaylistWithId = {
    id: '',
    name: '',
    description: '',
    tags: [],
  };
  const [{ description, name, id }, { onChange }, onSubmit] =
    useForm<PlaylistWithId>(initialValues ?? initialForm);
  const [isLoading, { setTrue: startLoading, setFalse: closeLoading }] =
    useBoolean();
  return (
    <>
      <form
        onSubmit={onSubmit(async (data) => {
          if (name.trim().length === 0) {
            toast.error('Combo is required');
            return;
          }

          startLoading();
          const { error } = await promiseResultWithError(
            fgcApi.request({
              url: `${FGC_API_URLS.PLAYLISTS}${id ? '/' + id : ''}`,
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
          toast.success('Your combo was created successfully!');
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
