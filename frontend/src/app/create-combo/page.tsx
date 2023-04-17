'use client';
import { ComboForm } from '@/common/components/combo-form';
import { WithProtectedRoute } from '@/common/components/with-protected-route';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Create Combo',
};
export default WithProtectedRoute(function CreateComboPage() {
  return (
    <main className="w-full h-full min-h-80vh flex flex-col items-center w-full px-10">
      <header className="w-full h-[100px] mt-10">
        <h1 className="text-light text-3xl font-primary">Combo Form</h1>
      </header>
      <ComboForm />
    </main>
  );
});
