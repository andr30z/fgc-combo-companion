'use client';

import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
export default function ForgotPage() {
  const [hasSubmited, setHasSubmited] = useState(false);
  const [value, setValue] = useState('');
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
            <h6 className="font-primary text-light text-center text-xl mb-3">
              We sent you an email with instructions on how to reset your
              password
            </h6>
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
              <>
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
                  onClick={() => {
                    setHasSubmited(true);
                  }}
                />
              </>
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
