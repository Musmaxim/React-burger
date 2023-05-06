import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ResetPassword.module.css";
import { colorLink } from "../../utils/data";
import { resetPassword } from "../../services/actions/User";
import useForm from "../../hooks/useForm";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const getDataStore = (store) => {
    return {
      isPasswordForgot: store.user.isPasswordForgot,
    };
  };
  const { isPasswordForgot } = useSelector(getDataStore);

  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password: values.password,
        token: values.token,
      })
    );
  };

  if (!isPasswordForgot) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div className={styles.container}>
        <span className={`text text_type_main-medium `}>
          Восстановление пароля
        </span>
        <form className={styles.form} onSubmit={handleResetPassword}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            name={"password"}
            size={"default"}
            icon={"ShowIcon"}
            extraClass="mb-6 mt-6"
            value={values.password}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"token"}
            size={"default"}
            extraClass="mb-6"
            value={values.token}
            onChange={handleChange}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <span className="text text_type_main-default mt-20 mb-4">
          Вспомнили пароль?{" "}
          <Link to="/login" style={{ color: colorLink }}>
            Войти
          </Link>
        </span>
      </div>
    );
  }
};

export default ResetPassword;