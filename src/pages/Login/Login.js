import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Login.module.css";
import { colorLink } from "../../utils/data";
import { login } from "../../services/actions/User";
import useForm from "../../hooks/useForm";

const Login = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
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
          value={values.email}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          size={"default"}
          icon={"ShowIcon"}
          extraClass="mb-6"
          value={values.password}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default mt-20 mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register" style={{ color: colorLink, textDecoration: "none" }}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default">
        Забыли пароль?{" "}
        <Link to="/forgotPassword" style={{ color: colorLink, textDecoration: "none" }}>
          Восстановить пароль
        </Link>
      </span>
    </div>
  );
};

export default Login;
