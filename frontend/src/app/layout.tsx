import { Footer } from '@/common/components/footer';
import { Header } from '@/common/components/header';
import { AuthProvider } from '@/modules/home/auth-provider';
import { Toast } from '@/modules/home/toast';
import type { Session } from 'next-auth';
import { Roboto } from 'next/font/google';
import './globals.css';
import { RefreshToken } from '@/modules/home/refresh-token';

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
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="min-h-screen bg-dark">
        <AuthProvider session={session}>
          <RefreshToken />
          <Header />
          {children}
          <Footer />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
