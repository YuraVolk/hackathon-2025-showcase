import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { error } from "console";

interface SignProps {
  num?: number;
  head?: string;
  des?: string;
}

const Sign: React.FC<SignProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasErr, setHasErr] = useState<boolean>(false);

  const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value || "";
    setEmail(value);
    setHasErr(value.trim().length === 0);
  };

  const handleSendPass = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value || "";
    setPassword(value);
    setHasErr(value.trim().length === 0);
  };

  return (
    <Paper elevation={3} className="addVol">
      <form className="addVolForm">
        <h2>Войти</h2>
        <TextField className='email'
          id="email"
          label="Ваш логин"
          variant="filled"
          style={{ border: hasErr ? "1px solid red" : undefined }}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
         <TextField className='input'
          id="password"
          label="Ваш пароль"
          variant="filled"
          style={{ border: hasErr ? "1px solid red" : undefined }}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button className='button'disabled={hasErr} color="secondary" onClick={handleSendPass} variant="contained">Зарегистрироваться</Button>
      </form>
    </Paper>
  );
};

export default Sign;
