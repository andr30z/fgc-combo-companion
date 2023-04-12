import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { promiseResultWithError } from '@/common/utils/Promises';
import { PasswordChangePage } from '@/modules/password-change-page';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'FGC - Password Reset',
};
type PageProps = { searchParams?: { token: string | undefined } };
export default async function PasswordChange({ searchParams }: PageProps) {
  const fgcApi = getFgcApiInstance();

  const token = searchParams?.token;
  if (!token) {
    return redirect('/login');
  }
  const { error } = await promiseResultWithError(
    fgcApi.get(FGC_API_URLS.GET_USER_VERIFICATION + '/' + token),
  );
  if (error) {
    return redirect('/login');
  }
  return <PasswordChangePage verificationToken={token} />;
}
