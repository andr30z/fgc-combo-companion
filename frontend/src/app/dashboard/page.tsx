'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { Modal } from '@/common/components/modal';
import { TabContent, Tabs } from '@/common/components/tabs';
import { WithProtectedRoute } from '@/common/components/with-protected-route';
import { useBoolean } from '@/common/hooks/boolean';
import { useUser } from '@/common/hooks/user';
import { useEffect } from 'react';

export default WithProtectedRoute(function Dashboard() {
  useUser({ redirectTo: null });
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center gap-2">
      <Tabs
        tabs={[
          { id: 'combos', label: 'Combos' },
          { id: 'playlists', label: 'Playlists' },
        ]}
        rootClassName="min-h-[500px] layout-padding-x"
      >
        <TabContent className="" value="combos">
          <div className="flex flex-1 w-full h-full">
            <Button onClick={openForm} text="Create Combo" />
          </div>
        </TabContent>
        <TabContent className="" value="playlists">
          <div className="flex flex-1 w-full h-full">
            <Button onClick={openForm} text="Create Playlist" />
          </div>
        </TabContent>
      </Tabs>

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
