
import { auth, getUserTeam } from '@/firebase';
import { useState, useEffect } from 'react';

type UserTeam = {
    teamName: string;
    teamId: string;
} | null;

export function useUserTeam() {
    const [userTeam, setUserTeam] = useState<UserTeam>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const role = await getUserTeam(user.uid);
          setUserTeam(role);
        } else {
          setUserTeam(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return userTeam;
  };
