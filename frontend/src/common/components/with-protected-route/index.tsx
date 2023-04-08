'use client';

import { useUser } from '@/common/hooks/user';
import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { LoadingBackdrop } from '../loading-backdrop';
export interface WithProtectedRouteOptions {
  redirectTo?: string;
  OnUnauthenticatedComponent?: ReactNode;
}
export function WithProtectedRoute(
  Component: FC,
  {
    OnUnauthenticatedComponent = null,
    redirectTo,
  }: WithProtectedRouteOptions = {},
) {
  return function WithProtectedRouteComponent() {
    const { isAuthenticated, isLoadingSession, isLoadingUser } = useUser({
      redirectOnError: redirectTo === undefined,
    });
    const router = useRouter();
    if (isLoadingSession || isLoadingUser) {
      return (
        <>
          <LoadingBackdrop isLoading />
          <div className="h-[30vh]" />
        </>
      );
    }

    if (!isAuthenticated && redirectTo) {
      router.push(redirectTo);
      return <div className="h-[30vh]" />;
    }
    return isAuthenticated ? <Component /> : OnUnauthenticatedComponent;
  };
}
