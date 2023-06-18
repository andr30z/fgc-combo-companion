import { ProtectedContent } from '@/common/components/with-protected-content';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedContent>{children}</ProtectedContent>;
}
