'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
export const LoginForm = () => {
  const [{ email, password }, { onChange }, onSubmit] = useForm({
    email: '',
    password: '',
  });
  const { status } = useSession();
  const router = useRouter();
  const [loading, { setTrue: startLoading, setFalse: endLoading }] =
    useBoolean();
  if (status === 'authenticated') {
    router.push('/dashboard/combos');
    return <></>;
  }
  return (
    <Card
      as="form"
      className="gap-3 shadow-primary shadow-lg w-[80vw]"
      size="xl"
      theme="dark"
    >
      <Input
        type="email"
        label="Email"
        value={email}
        placeholder="Your email"
        onChange={onChange('email')}
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={onChange('password')}
        required
      />
      <Button
        extraStyles="w-full mt-3"
        color="primary"
        text="Login"
        type="submit"
        leftIcon={<FiLogIn size={17} />}
        onClick={onSubmit(async ({ values: { email, password } }) => {
          let hasError = false;
          if (!email.includes('@')) {
            toast.error('Email must be valid');
            hasError = true;
          }
          if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            hasError = true;
          }

          if (hasError) {
            return;
          }

          startLoading();
          const data = await signIn('fgc-email-password', {
            email,
            password,
            redirect: false,
          });
          endLoading();
          if (data?.error) {
            toast.error(data.error);
          } else {
            router.push('/dashboard/combos');
          }

          // router.push('/dashboard/combos');
        })}
      />
      <Button
        extraStyles="w-full"
        color="dark"
        text="Continue with Google"
        onClick={() => signIn('google', { callbackUrl: '/dashboard/combos' })}
        leftIcon={<FcGoogle size={17} />}
      />
      <hr className="bg-light w-full" />
      <LoadingBackdrop isLoading={loading} />
      <footer className="flex flex-row w-full justify-center items-center">
        <p className="font-primary">
          <Link href="/forgot" color="secondary">
            Forgot your password?
          </Link>
          <span className="mx-2 text-light">|</span>
          <Link color="secondary" href="/signup">
            Sign up
          </Link>
        </p>
      </footer>
    </Card>
  );
};
