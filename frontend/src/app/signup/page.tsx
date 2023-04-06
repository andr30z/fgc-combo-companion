'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { useForm } from '@/common/hooks/form';
import { toast } from 'react-hot-toast';

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
          required
        />
        <Input
          value={name}
          onChange={onChange('name')}
          type="text"
          label="Name"
          placeholder="Your Name"
          required
        />
        <Input
          value={password}
          onChange={onChange('password')}
          type="password"
          label="Password"
          placeholder="Your password"
          required
        />
        <Input
          value={passwordConfirmation}
          onChange={onChange('passwordConfirmation')}
          type="password"
          label="Password confirmation"
          placeholder="Password confirmation"
          required
        />
        <Button
          onClick={onSubmit(
            async ({
              values: { email, name, password, passwordConfirmation },
            }) => {
              let hasError = false;

              if (!email.includes('@') || email.trim().length === 0) {
                toast.error('Email must be valid');
                hasError = true;
              }

              if (password.trim().length < 8) {
                toast.error('Password must be at least 8 characters');
                hasError = true;
              }

              if (password !== passwordConfirmation) {
                toast.error('Passwords must match');
                hasError = true;
              }

              if (name.trim().length === 0) {
                toast.error('Name must be at least 3 characters');
                hasError = true;
              }

              if (hasError) {
                return;
              }
            },
          )}
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
