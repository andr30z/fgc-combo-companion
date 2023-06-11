import { protectedRouteValidator } from '@/common/server/protected-route-validator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Profile',
  description: 'FGC Combo Companion - User Profile',
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  protectedRouteValidator();
  return <>{children}</>;
}
