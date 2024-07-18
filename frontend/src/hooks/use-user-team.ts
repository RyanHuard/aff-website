import { auth, getUserTeam } from "@/firebase";
import { useState, useEffect } from "react";

type UserTeam = {
  teamName: string;
  teamId: string;
} | null;

export function useUserTeam() {
  const [userTeam, setUserTeam] = useState<UserTeam>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const role = await getUserTeam(user.uid);
        setUserTeam(role);
      } else {
        setUserTeam(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { userTeam, isLoading };
}
