import React, { FC } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useMatch } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import { logout, updateUser } from "../../services/actions/User";
import useForm from "../../hooks/useForm";

type TProfileForm = {
  name: string;
  email: string;
};

const Profile: FC = () => {
  const dispatch = useDispatch();
  const matchProfile = useMatch("/profile");
  const matchOrders = useMatch("/profile/orders");

  const { user } = useSelector((store) => {
    return {
      // @ts-ignore
      user: store.user.user,
    };
  });
  const [isNewData, setIsNewData] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm<TProfileForm>({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore
      updateUser({
        name: values.name,
        email: values.email,
      })
    );
  };

  const handleCancelUpdate = () => {
    setValues(user);
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(logout());
  };

  useEffect(() => {
    if (user.name !== values.name || user.email !== values.email) {
      setIsNewData(true);
    } else {
      setIsNewData(false);
    }
  }, [values]);

  return (
    <div className={styles.container}>
      <section className={styles.menu}>
        <span
          className={`text text_type_main-medium pt-4 pb-4 ml-10 ${
            !matchProfile && "text_color_inactive"
          }`}
        >
          <Link to="/profile" className={styles.link}>
            Профиль
          </Link>
        </span>

        <span
          className={`text text_type_main-medium pt-4 pb-4 ml-10 ${
            !matchOrders && "text_color_inactive"
          }`}
        >
          <Link to="orders" className={styles.link}>
            История заказов
          </Link>
        </span>
        <span className="text text_type_main-medium pt-4 pb-4 ml-10 text_color_inactive">
          <Link to="/" className={styles.link} onClick={handleLogout}>
            Выход
          </Link>
        </span>

        <p className="text text_type_main-default text_color_inactive mt-20 ml-10">
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </section>
      <section>
        <Outlet />
        {matchProfile && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              icon={"EditIcon"}
              value={values.name}
              onChange={handleChange}
            />
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              icon={"EditIcon"}
              value={values.email}
              onChange={handleChange}
            />
            <Input
              type={"password"}
              name={"password"}
              placeholder={"Пароль"}
              icon={"EditIcon"}
              value={""}
              onChange={handleChange}
            />
            {isNewData && (
              <div className={styles.buttonsWrapper}>
                <span
                  className="text text_type_main-default"
                  style={{ color: "4c4cff", cursor: "pointer" }}
                  onClick={handleCancelUpdate}
                >
                  Отмена
                </span>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        )}
      </section>
    </div>
  );
};

export default Profile;
