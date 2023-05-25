import React, { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { Link, useMatch } from "react-router-dom";

const navClass = `${styles.nav} mr-2 mt-4 mb-4 pl-5 pr-5`;

const AppHeader: FC = () => {
  const matchMain = useMatch("/");
  const matchProfile = useMatch({ path: "/profile", end: false });

  return (
    <header className={styles.container}>
      <nav className={navClass}>
        <Link to="/" className={styles.link}>
          <BurgerIcon type={matchMain ? "primary" : "secondary"} />
          <p
            className={`ml-2 mt-4 mb-4 text text_type_main-default ${
              !matchMain && "text_color_inactive"
            }`}
          >
            Конструктор
          </p>
        </Link>
      </nav>
      <nav className={navClass}>
        <ListIcon type="primary" />
        <p className="text text_type_main-default text_color_inactive ml-2">
          Лента заказов
        </p>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={navClass}>
        <Link to="/profile" className={styles.link}>
          <ProfileIcon type={matchProfile ? "primary" : "secondary"} />
          <p
            className={`ml-2 mt-4 mb-4 text text_type_main-default ${
              !matchProfile && "text_color_inactive"
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
