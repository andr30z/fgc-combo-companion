'use client';

import { getFgcApiInstance } from '@/common/services/fgc-api';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export const QueryApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const fgcApi = getFgcApiInstance();
    //this request is only beign made because I'm deploying the backend on render.com on free plan
    //so maybe when some user access the page for the first time the api maybe idling
    try {
      fgcApi.get('/'); //pinging api
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('PINGING API ');
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
