/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUser } from '@/common/hooks/user';
import type { FC, ReactNode } from 'react';
import { ReactElement, useEffect, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OnUnauthenticatedComponent?: ReactElement<any, any> | null;
}
export function WithProtectedRoute<ComponentProps>(
  Component?: FC<ComponentProps>,
  {
    OnUnauthenticatedComponent = <div className="h-[50vh]" />,
    redirectTo = '/',
  }: WithProtectedRouteOptions = {},
) {
  return function WithProtectedRouteComponent(
    props: ComponentProps & { children?: ReactNode },
  ) {
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

    return isAuthenticated ? (
      <>
        {Component && <Component {...(props as any)} />} {props.children}
      </>
    ) : (
      OnUnauthenticatedComponent
    );
  };
}
