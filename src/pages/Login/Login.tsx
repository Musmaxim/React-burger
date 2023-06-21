import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Login.module.css";
import { login } from "../../services/actions/User";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../store/Hooks";

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const { form, onChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium `}>Вход</span>
      <form className={styles.form} onSubmit={handleLogin}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          size={"default"}
          extraClass="mt-6 mb-6"
          value={form.email}
          onChange={onChange}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          size={"default"}
          icon={"ShowIcon"}
          extraClass="mb-6"
          value={form.password}
          onChange={onChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default mt-20 mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default">
        Забыли пароль?{" "}
        <Link to="/forgotPassword" className={styles.link}>
          Восстановить пароль
        </Link>
      </span>
    </div>
  );
};

export default Login;
