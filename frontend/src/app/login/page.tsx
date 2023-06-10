import { unprotectedOnlyRouteValidator } from '@/common/server/protected-route-validator';
import { LoginForm } from '@/modules/login-page/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Login',
  description: 'Welcome to FGC Combo Companion',
};

export default function LoginPage() {
  unprotectedOnlyRouteValidator();
  return (
    <div className="w-full h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <LoginForm />
    </div>
  );
}
