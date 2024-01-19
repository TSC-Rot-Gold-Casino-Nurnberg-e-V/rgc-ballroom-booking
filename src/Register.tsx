import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { register } from "./firebase.ts";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await register(email, password);
  }

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h1>Registrieren</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="E-Mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="outlined">
          Registrieren
        </Button>
      </form>
    </div>
  );
};
