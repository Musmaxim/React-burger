import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Register.module.css";
import { register } from "../../services/actions/User";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../store/Hooks";

const Register: FC = () => {
  const dispatch = useAppDispatch();

  const { form, onChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium `}>Регистрация</span>
      <form className={styles.form} onSubmit={handleRegister}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
          extraClass="mt-6"
          value={form.name}
          onChange={onChange}
        />
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-default mt-20 mb-4">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default Register;
