import { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { Role } from "./Role.ts";

export const userContext = createContext<{
  user: User | null;
  role: Role | null;
}>({
  user: null,
  role: null,
});

export const useUser = () => useContext(userContext);
