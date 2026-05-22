import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

type Props = { children: React.ReactNode; requireOnboarding?: boolean };

export function AuthGuard({ children, requireOnboarding = false }: Props) {
  const user = useUserStore((s) => s.user);
  const onboarding = useUserStore((s) => s.onboarding);
  const location = useLocation();

  if (!user) return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  if (requireOnboarding && !onboarding) return <Navigate to="/onboarding" replace />;

  return <>{children}</>;
}
