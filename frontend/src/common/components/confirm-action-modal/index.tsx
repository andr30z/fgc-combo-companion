import type { FC } from 'react';
import { Button } from '../button';
import { Modal } from '../modal';
import { useBoolean } from '@/common/hooks/boolean';

interface ConfirmActionModalProps {
  onConfirm: () => void;
  modalTitle?: string;
  isOpen: boolean;
  closeConfirmation: () => void;
  confirmationText: string;
}
export const ConfirmActionModal: FC<ConfirmActionModalProps> = ({
  modalTitle = 'Confirm Action',
  onConfirm,
  closeConfirmation,
  isOpen,
  confirmationText,
}) => {
  return (
    <Modal
      width="md"
      isOpen={isOpen}
      title={modalTitle}
      onClose={closeConfirmation}
    >
      <main className="flex items-center my-4 border-b-2 border-b-secondary-dark pb-5">
        <p className="text-2xl text-light text-left">{confirmationText}</p>
      </main>
      <footer className="w-full flex justify-end gap-2 mt-5">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            closeConfirmation();
          }}
          color="dark"
          text="No, cancel action"
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            closeConfirmation();
            onConfirm();
          }}
          color="primary"
          text="Yes, proceed"
        />
      </footer>
    </Modal>
  );
};

export const ConfirmAction: FC<
  Omit<ConfirmActionModalProps, 'isOpen' | 'closeConfirmation'> & {
    children: (params: {
      closeConfirmActionModal: () => void;
      openConfirmModal: () => void;
    }) => React.ReactNode;
  }
> = (props) => {
  const [isOpen, { setTrue: openConfirm, setFalse: closeConfirm }] =
    useBoolean();
  return (
    <>
      <ConfirmActionModal
        {...props}
        isOpen={isOpen}
        closeConfirmation={closeConfirm}
      />
      {props.children({
        closeConfirmActionModal: closeConfirm,
        openConfirmModal: openConfirm,
      })}
    </>
  );
};
