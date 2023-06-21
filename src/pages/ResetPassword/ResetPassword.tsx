import React, { FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ResetPassword.module.css";
import { resetPassword } from "../../services/actions/ResetPassword";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../store/Hooks";

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { form, onChange } = useForm({
    password: "",
    token: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  return location.state?.prev === "/forgot-password" ? (
    <form onSubmit={handleSubmit} className={styles.main}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <Input
        placeholder={"Введите новый пароль"}
        onChange={onChange}
        value={form.password}
        name={"password"}
        extraClass="mb-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={form.token}
        name={"token"}
        error={false}
        size={"default"}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => {
            navigate("/login");
          }}
        >
          Войти
        </Button>
      </div>
    </form>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ResetPassword;
