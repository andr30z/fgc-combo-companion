import { Button } from '@/common/components/button';
import { unprotectedOnlyRouteValidator } from '@/common/server/protected-route-validator';
import { LoginForm } from '@/modules/login-page/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Login',
  description: 'Welcome to FGC Combo Companion',
};

type PageProps = { searchParams?: { error: string | undefined } };

export default function LoginPage({ searchParams }: PageProps) {
  unprotectedOnlyRouteValidator();
  const error = searchParams?.error;
  return (
    <div className="w-full h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      {error ? (
        <div className="flex flex-col items-center justify-center gap-2 px-2">
          <h4 className="text-light text-2xl text-center">{error}</h4>
          <Button text="Go to login" renderAsInnerLink href="/login" />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
