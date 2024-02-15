import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, getRole } from "./firebase.ts";
import { Role } from "./model/Role.ts";
import { userContext } from "./userContext.ts";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    getRole(user?.uid).then(setRole);
  }, [user]);

  const value = useMemo(() => {
    return { user, role };
  }, [role, user]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
