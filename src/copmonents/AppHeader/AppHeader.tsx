import React, { FC } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";

const AppHeader: FC = () => {
  return (
    <header className={styles.container}>
      <Navigation to="/" title="Конструктор" icon="burger" />
      <Navigation to="/feed" title="Лента заказов" icon="feed" />
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <Navigation to="/profile" title="Личный кабинет" icon="profile" />
    </header>
  );
};

export default AppHeader;
