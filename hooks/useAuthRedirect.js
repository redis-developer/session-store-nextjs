import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthRedirect(redirectTo = "/dashboard", redirectIfAuthenticated = true) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (redirectIfAuthenticated && status === "authenticated") {
      router.replace(redirectTo);
    } else if (!redirectIfAuthenticated && status === "unauthenticated") {
      router.replace(redirectTo);
    }
  }, [status, router, redirectTo, redirectIfAuthenticated]);
}
