import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, getRole } from "./firebase.ts";

const userContext = createContext<{
  user: User | null;
  role: string;
}>({
  user: null,
  role: "",
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");

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

export const useUser = () => useContext(userContext);
