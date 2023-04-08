'use client';
import { WithProtectedRoute } from '@/common/components/with-protected-route';
import { useUser } from '@/common/hooks/user';
export default WithProtectedRoute(function Dashboard() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="w-full h-full min-h-80vh flex flex-col justify-center items-center gap-2">
      <h1 className="text-6xl font-bold text-light text-center">Dashboard</h1>
    </div>
  );
});
