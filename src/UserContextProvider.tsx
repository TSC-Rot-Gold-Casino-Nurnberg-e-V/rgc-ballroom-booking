import { PropsWithChildren, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, getRole } from "./firebase.ts";
import { Role } from "./Role.ts";
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

  return (
    <userContext.Provider value={{ user, role }}>
      {children}
    </userContext.Provider>
  );
};
