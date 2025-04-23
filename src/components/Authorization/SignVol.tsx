import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

interface SignProps {
  num?: number;
  head?: string;
  des?: string;
}

const Sign: React.FC<SignProps> = (props) => {
  const { num, head, des } = props;
  const [fio, setFio] = useState<string>("");
  const [inn, setInn] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birth_date, setBirthDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    fio: false,
    inn: false,
    phone_number: false,
    email: false,
    birth_date: false,
    password: false,
  });

  const send = (
    fio: string,
    inn: string,
    phone_number: string,
    email: string,
    birth_date: string,
    password: string
  ) => {
    const newErrors = { ...errors };
    if (fio == "") {
      newErrors.fio = true;
    }
    if (inn == "") {
      newErrors.inn = true;
    }
    if (phone_number == "") {
      newErrors.phone_number = true;
    }
    if (email == "") {
      newErrors.email = true;
    }
    if (birth_date == "") {
      newErrors.birth_date = true;
    }
    if (isNaN(Number(password))) {
      newErrors.password = true;
    }

    setErrors(newErrors);
  };

  return (
    <Paper elevation={3} className="addVol">
      <form className="addVolForm">
        <h2>Регистрация Волонтера</h2>
        <label htmlFor="fio"></label>
        <TextField
          fullWidth
          className="input"
          error={errors.fio}
          helperText={errors.fio ? "Введите ваше ФИО" : ""}
          id="fio"
          label="ФИО"
          variant="filled"
          value={fio}
          onChange={(e) => {
            setFio(e.currentTarget.value);
            setErrors({    fio: false,
              inn: false,
              phone_number: false,
              email: false,
              birth_date: false,
              password: false, })
          }}
        />
        <TextField
          fullWidth
          className="input"
          id="inn"
          label="ИНН"
          variant="filled"
          error={errors.inn}
          helperText={errors.inn ? "Введите ваш ИНН" : ""}
          value={inn}
          onChange={(e) => setInn(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          className="input"
          id="phone_number"
          label="Ваш номер телефона"
          variant="filled"
          error={errors.phone_number}
          helperText={errors.phone_number ? "Введите ваш номер телефона" : ""}
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          className="input"
          id="birth_date"
          label="Ваша дата рождения"
          variant="filled"
          error={errors.birth_date}
          helperText={errors.birth_date ? "Введите вашу дату рождения" : ""}
          value={birth_date}
          onChange={(e) => setBirthDate(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          className="input"
          id="email"
          label="Ваша почта"
          variant="filled"
          error={errors.email}
          helperText={errors.email ? "Введите вашу почту" : ""}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          fullWidth
          className="input"
          id="password"
          label="Ваш код доступа"
          variant="filled"
          error={errors.password}
          helperText={errors.password ? "Введите ваш код доступа" : ""}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button
          className="button"
          disabled={
            errors.birth_date ||
            errors.email ||
            errors.fio ||
            errors.inn ||
            errors.password ||
            errors.phone_number
          }
          color="secondary"
          onClick={() => {
            send(fio, inn, phone_number, email, birth_date, password);
          }}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

export default Sign;
