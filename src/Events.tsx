import { Button } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

export const Events = () => {
  const router = useRouter();

  return (
    <div className="">
      <h1>Events...</h1>
      <Button
        variant="outlined"
        onClick={() => router.navigate({ to: "/events/new" })}
      >
        Neuen Termin erstellen
      </Button>
    </div>
  );
};
