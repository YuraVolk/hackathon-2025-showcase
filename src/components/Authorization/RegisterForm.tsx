import React, { memo, useState } from "react";
import { TextField, Button, Tabs, Tab, Link } from "@mui/material";
import NextLink from "next/link";
import styles from "./AuthForm.module.css";

export const RegisterForm = memo(() => {
  const [userType, setUserType] = useState<"volunteer" | "company">(
    "volunteer"
  );
  const [fio, setFio] = useState<string>("");
  const [inn, setInn] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyPassword, setCompanyPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    fio: false,
    inn: false,
    phoneNumber: false,
    email: false,
    birthDate: false,
    password: false,
    companyEmail: false,
    companyPassword: false,
  });

  const handleUserTypeChange = (
    event: React.SyntheticEvent,
    newValue: "volunteer" | "company"
  ) => {
    setUserType(newValue);
  };

  const validateVolunteerForm = () => {
    const newErrors = {
      fio: fio.trim().length === 0,
      inn: inn.trim().length === 0,
      phoneNumber: phoneNumber.trim().length === 0,
      email: email.trim().length === 0,
      birthDate: birthDate.trim().length === 0,
      password: password.trim().length === 0,
      companyEmail: false,
      companyPassword: false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const validateCompanyForm = () => {
    const newErrors = {
      fio: false,
      inn: false,
      phoneNumber: false,
      email: false,
      birthDate: false,
      password: false,
      companyEmail: companyEmail.trim().length === 0,
      companyPassword: companyPassword.trim().length === 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid =
      userType === "volunteer"
        ? validateVolunteerForm()
        : validateCompanyForm();

    if (isValid) {
      if (userType === "volunteer") {
        console.log({ fio, inn, phoneNumber, email, birthDate, password });
      } else {
        console.log({ email: companyEmail, password: companyPassword });
      }
    }
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.authTitle}>Регистрация</h1>
        <div className={styles.tabsWrapper}>
          <Tabs
            value={userType}
            onChange={handleUserTypeChange}
            variant="fullWidth"
          >
            <Tab value="volunteer" label="Волонтер" />
            <Tab value="company" label="Партнер" />
          </Tabs>
        </div>
        {userType === "volunteer" ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="fio"
              label="ФИО"
              variant="filled"
              error={errors.fio}
              helperText={errors.fio ? "Введите ваше ФИО" : ""}
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="inn"
              label="ИНН"
              variant="filled"
              error={errors.inn}
              helperText={errors.inn ? "Введите ваш ИНН" : ""}
              value={inn}
              onChange={(e) => setInn(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="phoneNumber"
              label="Ваш номер телефона"
              variant="filled"
              error={errors.phoneNumber}
              helperText={
                errors.phoneNumber ? "Введите ваш номер телефона" : ""
              }
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="birthDate"
              label="Ваша дата рождения"
              variant="filled"
              error={errors.birthDate}
              helperText={errors.birthDate ? "Введите вашу дату рождения" : ""}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Ваша почта"
              variant="filled"
              error={errors.email}
              helperText={errors.email ? "Введите вашу почту" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Ваш код доступа"
              variant="filled"
              type="password"
              error={errors.password}
              helperText={errors.password ? "Введите ваш код доступа" : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </>
        ) : (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="companyEmail"
              label="Ваша почта"
              variant="filled"
              error={errors.companyEmail}
              helperText={errors.companyEmail ? "Введите вашу почту" : ""}
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              className={styles.inputField}
            />
            <TextField
              fullWidth
              margin="normal"
              id="companyPassword"
              label="Ваш код доступа"
              variant="filled"
              type="password"
              error={errors.companyPassword}
              helperText={
                errors.companyPassword ? "Введите ваш код доступа" : ""
              }
              value={companyPassword}
              onChange={(e) => setCompanyPassword(e.target.value)}
              className={styles.inputField}
            />
          </>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          className={styles.submitButton}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.authFooter}>
          <span className={styles.footerText}>Уже есть аккаунт? </span>
          <Link
            component={NextLink}
            href="/login"
            className={styles.footerLink}
          >
            Войдите
          </Link>
        </div>
      </form>
    </div>
  );
});

RegisterForm.displayName = "RegisterForm";
