import { Button } from '@/common/components/button';
import { unprotectedOnlyRouteValidator } from '@/common/server/protected-route-validator';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { promiseResultWithError } from '@/common/utils/promises';
import { PasswordForm } from '@/modules/password-change-page/password-form';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'FGC - Password Reset',
};
type PageProps = { searchParams?: { token: string | undefined } };
export default async function PasswordChange({ searchParams }: PageProps) {
  unprotectedOnlyRouteValidator();
  const token = searchParams?.token;
  if (!token) {
    redirect('/login');
  }

  const { error } = await promiseResultWithError(
    getFgcApiInstance().get(FGC_API_URLS.GET_USER_VERIFICATION + '/' + token),
  );

  return error ? (
    <main className="w-full h-full min-h-80vh flex flex-col justify-center items-center gap-2">
      <h1 className="text-light font-primary text-2xl font-bold">
        {error.response?.data?.errors?.join(', ') ??
          'Something went wrong. Try again.'}
      </h1>
      <Button text="Go to Login" href="/login" renderAsInnerLink />
    </main>
  ) : (
    <PasswordForm verificationToken={token} />
  );
}
