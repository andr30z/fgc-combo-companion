'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { useForm } from '@/common/hooks/form';
import { FcGoogle } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';

export default function LoginPage() {
  const [{ email, password }, onChange, onSubmit] = useForm({
    email: '',
    password: '',
  });

  return (
    <div className="w-full h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card
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
          leftIcon={<FiLogIn size={17} />}
          onClick={onSubmit(async ({ values }) => {
            // eslint-disable-next-line no-console
            console.log(values);
          })}
        />
        <Button
          extraStyles="w-full"
          color="dark"
          text="Continue with Google"
          leftIcon={<FcGoogle size={17} />}
          onClick={onSubmit(async ({ values }) => {
            // eslint-disable-next-line no-console
            console.log(values);
          })}
        />

        <hr className="bg-light w-full" />
        <footer className="flex flex-row w-full justify-center items-center">
          <p className="font-primary">
            <Link href="/forgot" className="hover:text-light text-secondary">
              Forgot your password?
            </Link>
            <span className="mx-2 text-light">|</span>
            <Link className="hover:text-light text-secondary" href="/signup">
              Sign up
            </Link>
          </p>
        </footer>
      </Card>
    </div>
  );
}
