import React, { memo, useState } from "react";
import { TextField, Button, Tabs, Tab, Link } from "@mui/material";
import NextLink from "next/link";
import styles from "./AuthForm.module.css";
import { useSetCookie } from "cookies-next";
import { useRouter } from "next/router";

export const SignInForm = memo(() => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const setCookie = useSetCookie();
  const [userType, setUserType] = useState<"volunteer" | "company">(
    "volunteer"
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasErr, setHasErr] = useState<boolean>(false);

  const handleUserTypeChange = (
    event: React.SyntheticEvent,
    newValue: "volunteer" | "company"
  ) => {
    setUserType(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setHasErr(true);
      return;
    }

    setSubmitting(true);
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: email,
          password,
        }),
      }).then((response) => response.json());
      setCookie("token", result.user?.token);
      if (!result.user?.token) {
        return;
      }

      router.push(userType === "volunteer" ? "/my-bonuses" : "/volunteers/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.authForm}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.authTitle}>Вход в систему</h1>

        <div className={styles.tabsWrapper}>
          <Tabs
            value={userType}
            onChange={handleUserTypeChange}
            variant="fullWidth"
            className={styles.tabs}
          >
            <Tab value="volunteer" label="Волонтер" />
            <Tab value="company" label="Партнер" />
          </Tabs>
        </div>
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label={userType === "volunteer" ? "Ваша почта" : "Ваш логин"}
          variant="filled"
          error={hasErr && email.trim().length === 0}
          helperText={
            hasErr && email.trim().length === 0 ? "Это поле обязательно" : ""
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label={userType === "volunteer" ? "Ваш код доступа" : "Ваш пароль"}
          variant="filled"
          type="password"
          error={hasErr && password.trim().length === 0}
          helperText={
            hasErr && password.trim().length === 0 ? "Это поле обязательно" : ""
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Войти
        </Button>
        <div className={styles.authFooter}>
          <span className={styles.footerText}>Нет аккаунта? </span>
          <Link
            component={NextLink}
            href="/register"
            className={styles.footerLink}
          >
            Зарегистрируйтесь
          </Link>
        </div>
      </form>
    </div>
  );
});

SignInForm.displayName = "SignInForm";
