'use client';
import { useForm } from '@/common/hooks/form';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '../button';
import { Card } from '../card';
import { Input } from '../input';
interface PasswordChangeFormProps {
  useOldPasswordInput?: boolean;
  onSubmit: (oldPassword: string, newPassword: string) => Promise<void>;
}
export const PasswordChangeForm: FC<PasswordChangeFormProps> = ({
  useOldPasswordInput = false,
  onSubmit,
}) => {
  const [
    { newPassword, oldPassword, newPasswordConfirmation },
    onChange,
    onSubmitForm,
  ] = useForm({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });
  return (
    <Card
      size="xl"
      shadowSize="lg"
      theme="dark"
      cardTitle="Password change"
      className="gap-2"
    >
      {useOldPasswordInput && (
        <Input
          label="Old Password"
          value={oldPassword}
          onChange={onChange('oldPassword')}
          required
          type="password"
        />
      )}
      <Input
        label="New Password"
        value={newPassword}
        onChange={onChange('newPassword')}
        required
        type="password"
      />
      <Input
        label="Confirm New Password"
        onChange={onChange('newPasswordConfirmation')}
        value={newPasswordConfirmation}
        required
        type="password"
      />
      <Button
        extraStyles="w-full mt-3"
        text="Submit"
        onClick={onSubmitForm(async () => {
          let hasError = false;

          if (
            useOldPasswordInput &&
            (!oldPassword || oldPassword.trim().length === 0)
          ) {
            toast.error('Old password is required');
            hasError = true;
          }

          if (newPassword !== newPasswordConfirmation) {
            toast.error('Passwords do not match');
            hasError = true;
          }
          if (newPassword.trim().length < 8) {
            toast.error('Password must be at least 8 characters');
            hasError = true;
          }
          if (hasError) {
            return;
          }

          return onSubmit(oldPassword, newPassword);
        })}
      />
    </Card>
  );
};
