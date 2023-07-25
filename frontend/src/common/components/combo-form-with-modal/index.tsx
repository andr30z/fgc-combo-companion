'use client';

import { useBoolean } from '@/common/hooks/boolean';
import type { Combo } from '@/common/types/combo';
import type { FC } from 'react';
import { ComboForm } from '../combo-form';
import { Modal } from '../modal';

interface ComboFormWithModalProps {
  onSuccessSaveComboForm?: () => void;
  renderTriggerOpenForm: (openForm: () => void) => JSX.Element;
  initialValues?: Combo;
  customUrl?: string;
}
export const ComboFormWithModal: FC<ComboFormWithModalProps> = ({
  renderTriggerOpenForm,
  initialValues,
  onSuccessSaveComboForm,
  customUrl,
}) => {
  const [isOpen, { setFalse: closeForm, setTrue: openForm }] = useBoolean();
  return (
    <>
      <Modal title="Combo Form" width="xl" isOpen={isOpen} onClose={closeForm}>
        <ComboForm
          onSuccessUrl={customUrl}
          onSuccess={() => {
            if (onSuccessSaveComboForm) {
              onSuccessSaveComboForm();
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
