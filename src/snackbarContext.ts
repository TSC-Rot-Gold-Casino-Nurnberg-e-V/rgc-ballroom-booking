import { createContext, useContext } from "react";

export const snackbarContext = createContext<{
  showSnackbar: (message: string) => void;
}>({
  showSnackbar: () => undefined,
});

export const useSnackbar = () => useContext(snackbarContext);
