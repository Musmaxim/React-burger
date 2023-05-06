import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.css";
import useForm from "../../hooks/useForm";
import { forgotPassword } from "../../services/actions/User";
import { colorLink } from '../../utils/data';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isPasswordForgot } = useSelector((store) => {
    return {
      isPasswordForgot: store.user.isPasswordForgot,
    };
  });

  const { values, handleChange } = useForm({
    email: "",
  });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(
      forgotPassword({
        email: values.email,
      })
    );
  };

  if (isPasswordForgot) {
    return <Navigate to="/resetPassword" replace />;
  } else {
    return (
      <div className={styles.container}>
        <span className={`text text_type_main-medium `}>
          Восстановление пароля
        </span>
        <form
          className={styles.form}
          onSubmit={handleForgotPassword}
        >
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            size={"default"}
            extraClass="mt-6 mb-6"
            value={values.email}
            onChange={handleChange}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;
