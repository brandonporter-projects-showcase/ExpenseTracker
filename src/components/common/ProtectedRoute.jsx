import { useNavigate } from "react-router";
import { useUser } from "../../features/profile/hooks/useUser";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && user?.role !== "authenticated") {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="animate-custom-pulse bg-background flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <img src="/Logo2.png" className="size-24" />
          <p className="text-primary text-sm font-medium">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (user?.role === "authenticated") return children;

  return null;
}
