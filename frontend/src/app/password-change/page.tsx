import { PasswordForm } from '@/modules/password-change-page/password-form';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'FGC - Password Reset',
};
type PageProps = { searchParams?: { token: string | undefined } };
export default async function PasswordChange({ searchParams }: PageProps) {
  const token = searchParams?.token;
  if (!token) {
    return redirect('/login');
  }

  return <PasswordForm verificationToken={token} />;
}
