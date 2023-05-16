import { ComboForm } from '@/common/components/combo-form';
import { ProtectedContent } from '@/common/components/with-protected-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Create Combo',
};
export default function CreateComboPage() {
  return (
    <ProtectedContent>
      <main className="w-full h-full min-h-80vh flex flex-col items-center px-10">
        <header className="w-full h-[100px] mt-10">
          <h1 className="text-light text-3xl font-primary">Combo Form</h1>
        </header>
        <ComboForm />
      </main>
    </ProtectedContent>
  );
}
