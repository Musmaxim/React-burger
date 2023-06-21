import React, { FC } from "react";
import { useCallback } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.css";
import { patchUser } from "../../services/actions/User";
import { useForm } from "../../hooks/useForm";
import { ProfileNavigation } from "./ProfileNavigation";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);

  const { form, onChange, setForm } = useForm({
    name: user?.name,
    email: user?.email,
    password: "",
  });

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(patchUser(form));
  };

  const onCancel = () => {
    setForm(user);
  };

  const isChanged = useCallback(
    () =>
      user &&
      (user.name !== form.name || user.email !== form.email || !!form.password),
    [user, form]
  );

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <ProfileNavigation />
        <p className="text text_type_main-default text_color_inactive mt-20 ml-5">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form onSubmit={onSave} className={styles.form + " ml-15"}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          error={false}
          size={"default"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={onChange}
          value={form.email}
          name={"email"}
          error={false}
          size={"default"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <PasswordInput
          placeholder={"Пароль"}
          onChange={onChange}
          value={form.password}
          name={"password"}
          icon={"EditIcon"}
          extraClass="mb-6"
        />
        {isChanged() && (
          <div className={styles.buttons}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mr-4"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onCancel}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
