'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { useForm } from '@/common/hooks/form';

export default function SignupPage() {
  const [{ email, password, passwordConfirmation, name }, onChange, onSubmit] =
    useForm({
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
    });
  return (
    <div className="w-screen h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card
        className="gap-3 shadow-primary shadow-lg w-[80vw]"
        size="xl"
        theme="dark"
      >
        <Input
          value={email}
          onChange={onChange('email')}
          type="email"
          label="Email"
          placeholder="Your email"
        />
        <Input
          value={name}
          onChange={onChange('name')}
          type="text"
          label="Name"
          placeholder="Your Name"
        />
        <Input
          value={password}
          onChange={onChange('password')}
          type="password"
          label="Password"
          placeholder="Your password"
        />
        <Input
          value={passwordConfirmation}
          onChange={onChange('passwordConfirmation')}
          type="password"
          label="Password confirmation"
          placeholder="Password confirmation"
        />
        <Button
          onClick={onSubmit(async ({ values }) => {
            // eslint-disable-next-line no-console
            console.log(values);
          })}
          extraStyles="w-full mt-3"
          color="primary"
          text="Create account"
        />

        <footer className="flex flex-row w-full justify-center items-center">
          <Link href="/login">Already have an account? Log In</Link>
        </footer>
      </Card>
    </div>
  );
}
