'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { useForm } from '@/common/hooks/form';
import { FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [{ email, password }, onChange, onSubmit] = useForm({
    email: '',
    password: '',
  });

  return (
    <div className="w-screen h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card className="gap-3 shadow-primary shadow-lg" size="xl" theme="dark">
        <Input
          type="email"
          label="Email"
          value={email}
          placeholder="Your email"
          onChange={onChange('email')}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={onChange('password')}
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
      </Card>
    </div>
  );
}
