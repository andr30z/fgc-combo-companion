'use client';
import { Button } from '@/common/components/button';
import { Card } from '@/common/components/card';
import { GoogleLogin } from '@/common/components/google-login-button';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  useUser({ redirectTo: null });
  const [
    { email, password, passwordConfirmation, name },
    { onChange },
    onSubmit,
  ] = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
  });
  const [isLoading, { setFalse: closeLoading, setTrue: startLoading }] =
    useBoolean();

  const [hasCreated, { setTrue: setCreatedTrue }] = useBoolean(false);
  return (
    <div className="w-full h-full min-h-80vh flex flex-row justify-center items-center">
      <Card
        className="min-h-[550px] gap-5 shadow-primary shadow-lg w-[80vw]"
        size="xl"
        theme="dark"
        as="form"
      >
        {hasCreated ? (
          <>
            <h6 className="font-primary text-light text-lg text-center font-semibold">
              Account created succesfully. You can now procced to log in.
            </h6>
            <h6 className="font-primary text-light text-lg text-center font-semibold">
              Additionaly, we sent you an email with a link to confirm your
              email.
            </h6>
            <Button
              text="Go to login"
              renderAsInnerLink
              href="/login"
              color="primary"
            />
          </>
        ) : (
          <>
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
            <footer className="flex flex-col w-full justify-center items-center gap-3 text-center">
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
                    startLoading();
                    return fgcApi
                      .post(FGC_API_URLS.SIGNUP, {
                        email,
                        name,
                        password,
                      })
                      .then(() => {
                        toast.success('Account created successfully');
                        setCreatedTrue();
                      })
                      .catch((e) => {
                        const error = e.response?.data?.errors;
                        toast.error(
                          Array.isArray(error)
                            ? error.join(', ')
                            : 'Something went wrong, please try again later.',
                        );
                      })
                      .finally(closeLoading);
                  },
                )}
                extraStyles="w-full mt-3 border-solid border-2 border-primary hover:border-light"
                color="primary"
                text="Create account"
                type="submit"
              />
              <GoogleLogin extraStyles="w-full py-0" />
              <Link href="/login">Already have an account? Log in</Link>
            </footer>
          </>
        )}
      </Card>
      <LoadingBackdrop isLoading={isLoading} />
    </div>
  );
}
