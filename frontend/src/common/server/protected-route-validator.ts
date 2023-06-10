import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function protectedRouteValidator() {
  if (cookies().has('accessToken')) {
    return true;
  }

  redirect('/login');
}

export function unprotectedOnlyRouteValidator() {
  if (cookies().has('accessToken')) {
    redirect('/dashboard/combos');
  }
  return true;
}
