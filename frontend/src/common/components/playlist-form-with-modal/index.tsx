import { FC } from 'react';
import { Modal } from '../modal';
import { PlaylistForm } from '../playlist-form';
import { useBoolean } from '@/common/hooks/boolean';
import type { Playlist } from '@/common/types/playlist';
interface PlaylistFormWithModalProps {
  onSuccessSavePlaylistForm?: (playlist: Playlist) => void;
  renderTriggerOpenForm: (openForm: () => void) => JSX.Element;
  initialValues?: Playlist | null;
}
export const PlaylistFormWithModal: FC<PlaylistFormWithModalProps> = ({
  renderTriggerOpenForm,
  onSuccessSavePlaylistForm,
  initialValues,
}) => {
  const [isOpen, { setFalse: closeForm, setTrue: openForm }] = useBoolean();
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeForm} title="Playlist Form">
        <PlaylistForm
          onSuccess={(playlist) => {
            if (onSuccessSavePlaylistForm) {
              onSuccessSavePlaylistForm(playlist);
            }
            closeForm();
          }}
          initialValues={initialValues}
        />
      </Modal>
      {renderTriggerOpenForm(openForm)}
    </>
  );
};
