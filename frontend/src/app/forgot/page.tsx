'use client';

import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { useState } from 'react';
export default function ForgotPage() {
  const [value, setValue] = useState('');
  return (
    <div className="w-screen h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card
        cardTitle="Forgot your password?"
        size="xl"
        shadowSize="lg"
        theme="dark"
      >
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
          />
        </main>
        <footer>
          <Link href="/login">Go Back to login</Link>
        </footer>
      </Card>
    </div>
  );
}
