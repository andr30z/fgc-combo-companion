import { useBoolean } from '@/common/hooks/boolean';
import { type FC } from 'react';
import { Button } from '../button';
import { Modal } from '../modal';
import { Root } from '@radix-ui/react-portal';

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
      width="xl"
      isOpen={isOpen}
      title={modalTitle}
      onClose={closeConfirmation}
    >
      <div className="flex items-center my-4 border-b-2 border-b-secondary-dark pb-5">
        <p className="text-2xl text-light text-left">{confirmationText}</p>
      </div>
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
      <Root>
        <div
          className="hidden"
          onClick={(e) => {
            //this div only exists to avoid the click event bubbling inside the combo list component...
            e.stopPropagation();
          }}
        >
          <ConfirmActionModal
            {...props}
            isOpen={isOpen}
            closeConfirmation={closeConfirm}
          />
        </div>
      </Root>
      {props.children({
        closeConfirmActionModal: closeConfirm,
        openConfirmModal: openConfirm,
      })}
    </>
  );
};
