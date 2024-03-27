import { FcGoogle } from 'react-icons/fc';
import { Button, type ButtonProps } from '../button';
import { signIn } from 'next-auth/react';

interface Props {
  extraStyles?: string;
  color?: ButtonProps['color'];
}

export const GoogleLogin: React.FC<Props> = ({
  extraStyles,
  color = 'dark',
}) => {
  return (
    <Button
      extraStyles={`${extraStyles} border-solid border-2 border-light`}
      color={color}
      text="Continue with Google"
      onClick={() => signIn('google', { callbackUrl: '/dashboard/combos' })}
      leftIcon={<FcGoogle size={17} />}
    />
  );
};
