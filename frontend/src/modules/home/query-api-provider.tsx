'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export const QueryApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
