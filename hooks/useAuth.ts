import { auth, db } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface AuthState {
  user: User | null;
  profileComplete: boolean | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        setProfileComplete(docSnap.exists() && docSnap.data()?.profileComplete === true);
      } else {
        setProfileComplete(null);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading, profileComplete };
}