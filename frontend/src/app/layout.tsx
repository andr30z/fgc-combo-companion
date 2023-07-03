import { Footer } from '@/common/components/footer';
import { Header } from '@/common/components/header';
import { QueryApiProvider } from '@/modules/home/query-api-provider';
import { AuthProvider } from '@/modules/home/auth-provider';
import { Toast } from '@/modules/home/toast';
import type { Session } from 'next-auth';
import { Roboto } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { RefreshToken } from '@/modules/home/refresh-token';
import { getFgcApiInstance } from '@/common/services/fgc-api';
export const metadata = {
  title: 'FGC Combo Companion',
  description: 'FGC COMBO COMPANION',
};

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const fgcApi = getFgcApiInstance();
  //this request is only beign made because I'm deploying the backend on render.com on free plan
  //so maybe when some user access the page for the first time the api maybe idling
  fgcApi.get('/'); //pinging api
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="min-h-screen bg-dark">
        <QueryApiProvider>
          <AuthProvider session={session}>
            <RefreshToken />
            <Header />
            {children}
            <Footer />
            <Toast />
            <Analytics />
          </AuthProvider>
        </QueryApiProvider>
      </body>
    </html>
  );
}
