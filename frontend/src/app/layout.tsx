import { Footer } from '@/common/components/footer';
import { GoogleAnalytics } from '@/common/components/google-analytics';
import { Header } from '@/common/components/header';
import { AuthProvider } from '@/modules/home/auth-provider';
import { QueryApiProvider } from '@/modules/home/query-api-provider';
import { RefreshToken } from '@/modules/home/refresh-token';
import { Toast } from '@/modules/home/toast';
import { Analytics } from '@vercel/analytics/react';
import type { Session } from 'next-auth';
import { Roboto } from 'next/font/google';
import './globals.css';
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

export default function RootLayout(props: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <GoogleAnalytics googleAnalyticsId={process.env.GOOGLE_ANALYTICS_ID} />
      <body className="min-h-screen bg-dark">
        <QueryApiProvider>
          <AuthProvider session={props.session}>
            <RefreshToken />
            <Header />
            {props.children}
            <Footer />
            <Toast />
            <Analytics />
          </AuthProvider>
        </QueryApiProvider>
      </body>
    </html>
  );
}
