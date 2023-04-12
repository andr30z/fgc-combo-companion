import { Button } from '@/common/components/button';
import { FGC_API_URLS, getFgcApiInstance } from '@/common/services/fgc-api';
import { promiseResultWithError } from '@/common/utils/Promises';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'FGC - Email Verification',
};
type PageProps = { searchParams?: { token: string | undefined } };

export default async function EmailVerification({ searchParams }: PageProps) {
  const fgcApi = getFgcApiInstance();

  const token = searchParams?.token;
  if (!token) {
    return redirect('/login');
  }
  const { error } = await promiseResultWithError(
    fgcApi.patch(FGC_API_URLS.EMAIL_VERIFICATION + '?token=' + token),
  );

  return (
    <div className="w-full h-full min-h-80vh flex flex-column justify-center items-center gap-2">
      <h1 className="text-3xl font-bold text-light">
        {error
          ? 'Email verification failed, please try again.'
          : 'Email verified successfuly'}
      </h1>

      <Button text="Go to login" renderAsInnerLink href="/login" />
    </div>
  );
}
