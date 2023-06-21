import React, { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.css";
import { useForm } from "../../hooks/useForm";
import { forgotPassword } from "../../services/actions/ForgotPassword";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();

  const { success } = useAppSelector((store) => store.forgotPassword);

  const { form, onChange } = useForm({ email: "" });

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };

  if (success) {
    return <Navigate to="/resetPassword" replace />;
  } else {
    return (
      <div className={styles.container}>
        <span className={`text text_type_main-medium `}>
          Восстановление пароля
        </span>
        <form className={styles.form} onSubmit={handleForgotPassword}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            size={"default"}
            extraClass="mt-6 mb-6"
            value={form.email}
            onChange={onChange}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <span className="text text_type_main-default mt-20 mb-4">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </span>
      </div>
    );
  }
};

export default ForgotPassword;
