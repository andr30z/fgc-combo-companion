'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { Modal } from '@/common/components/modal';
import { WithProtectedRoute } from '@/common/components/with-protected-route';
import { useBoolean } from '@/common/hooks/boolean';
import { useUser } from '@/common/hooks/user';
export default WithProtectedRoute(function Dashboard() {
  const { user } = useUser({ redirectTo: null });
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  return (
    <div className="w-full h-full min-h-80vh flex flex-col justify-center items-center gap-2">
      <h1 className="text-6xl font-bold text-light text-center">
        Dashboard, {user?.name}
      </h1>
      <Button onClick={openForm} text="Create Combo" />
      <Modal
        title="Combo Form"
        isOpen={isComboFormOpen}
        onClose={closeForm}
        width="lg"
      >
        <ComboForm onSuccess={closeForm} />
      </Modal>
    </div>
  );
});
