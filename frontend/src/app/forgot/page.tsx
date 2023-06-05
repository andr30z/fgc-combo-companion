'use client';

import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { useBoolean } from '@/common/hooks/boolean';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { promiseResultWithError } from '@/common/utils/promises';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoArrowBackSharp } from 'react-icons/io5';
export default function ForgotPage() {
  const [hasSubmited, setHasSubmited] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  return (
    <div className="w-screen h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card
        cardTitle={hasSubmited ? undefined : 'Forgot your password?'}
        size="xl"
        shadowSize="lg"
        theme="dark"
      >
        {hasSubmited ? (
          <>
            <h4 className="font-primary text-light text-center text-xl font-semibold mb-3">
              We sent you an email with instructions on how to reset your
              password
            </h4>
            <Button
              color="primary"
              extraStyles="w-full"
              renderAsInnerLink
              href="/login"
              leftIcon={<IoArrowBackSharp size={17} />}
              text="Go Back to Login"
            />
          </>
        ) : (
          <>
            <main className="flex gap-4 flex-1 flex-col justify-center items-center w-full">
              <Input
                label="Enter your email"
                placeholder="Your email"
                value={value}
                setValue={setValue}
              />
              <Button
                extraStyles="w-full"
                text="Send recovery email"
                color="primary"
                onClick={async () => {
                  if (value.trim().length === 0) {
                    return toast.error('Email is required');
                  }

                  if (!value.includes('@')) {
                    return toast.error('Email must be valid');
                  }

                  startLoading();
                  const { error } = await promiseResultWithError(
                    fgcApi.post(
                      FGC_API_URLS.PASSWORD_CHANGE_SOLICITATION,
                      null,
                      { params: { email: value } },
                    ),
                  );
                  stopLoading();

                  if (error) {
                    toast.error(
                      error.response?.data?.message ?? 'Something went wrong',
                    );
                    return;
                  }
                  setHasSubmited(true);
                }}
              />
              <LoadingBackdrop isLoading={isLoading} />
            </main>
            <footer>
              <Link href="/login">Go Back to login</Link>
            </footer>
          </>
        )}
      </Card>
    </div>
  );
}
