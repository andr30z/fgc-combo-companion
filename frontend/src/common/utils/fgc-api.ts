import { get } from 'lodash';
import { toast } from 'react-hot-toast';

export function displayFGCApiErrors(error: unknown, { duration = 5000 } = {}) {
  const formErrors: Array<string> = get(
    error as Record<string, Array<string>>,
    'response.data.errors',
  );
  toast.error(formErrors?.join(', ') || 'Something went wrong.', {
    duration,
  });
}
