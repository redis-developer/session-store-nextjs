"use client";

import { useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProfileCard } from "@/components/ui/ProfileCard";

function Dashboard() {
  useAuthRedirect("/", false);
  const { data: session, status } = useSession();

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  const userProfile = session.user;

  return (
    <div className={cn("bg-gray-100 min-h-screen flex items-center justify-center p-8")}>
      <div className={cn("max-w-2xl w-full")}>
        <ProfileCard
          user={userProfile}
          onLogout={handleLogout}
          sessionData={session}
        />
      </div>
    </div>
  );
}

export default Dashboard;
