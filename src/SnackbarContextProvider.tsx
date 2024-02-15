import { snackbarContext } from "./snackbarContext";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Snackbar } from "@mui/material";

export const SnackbarContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = useCallback((message: string) => {
    setIsOpen(true);
    setMessage(message);
  }, []);

  const contextValue = useMemo(() => {
    return { showSnackbar };
  }, [showSnackbar]);

  return (
    <snackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
    </snackbarContext.Provider>
  );
};
