'use client';

import { useUser } from '@/common/hooks/user';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { LoadingBackdrop } from '../loading-backdrop';

// const Backdrop = dynamic(
//   async () => {
//     const backdrop = await import('@/common/components/loading-backdrop');
//     return backdrop.LoadingBackdrop;
//   },
//   {
//     ssr: false,
//   },
// );
export interface WithProtectedRouteOptions {
  redirectTo?: string;
  OnUnauthenticatedComponent?: ReactNode;
}
export function WithProtectedRoute(
  Component: FC,
  {
    OnUnauthenticatedComponent = <div className="h-[50vh]" />,
    redirectTo,
  }: WithProtectedRouteOptions = {},
) {
  return function WithProtectedRouteComponent() {
    const { isAuthenticated, isLoadingSession, isLoadingUser } = useUser({
      redirectTo,
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      //temporary fix for radix ui hydratation error
      if (isLoadingSession || isLoadingUser) {
        setIsLoading(true);
      }
    }, [isLoadingSession]);

    if (isLoadingSession || isLoadingUser) {
      return (
        <div className="h-[50vh]">
          <LoadingBackdrop isLoading={isLoading} />
        </div>
      );
    }

    return isAuthenticated ? <Component /> : OnUnauthenticatedComponent;
  };
}
