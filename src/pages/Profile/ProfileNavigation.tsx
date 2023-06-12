import React from "react";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";

export const ProfileNavigation = () => {
  return (
    <>
      <NavLink
        end
        to={"/profile "}
        className={({ isActive }) =>
          `mr-2 mt-4 mb-4 pl-5 pr-5 ` +
          (isActive ? styles.activeNavLink : styles.navLink)
        }
      >
        <p className="text text_type_main-medium text_color_inactive">
          Профиль
        </p>
      </NavLink>
      <NavLink
        end
        to={"/profile/orders"}
        className={({ isActive }) =>
          `mr-2 mt-4 mb-4 pl-5 pr-5 ` +
          (isActive ? styles.activeNavLink : styles.navLink)
        }
      >
        <p className="text text_type_main-medium text_color_inactive">
          История заказов
        </p>
      </NavLink>
      <NavLink
        to={"/logout"}
        className={({ isActive }) =>
          `mr-2 mt-4 mb-4 pl-5 pr-5 ` +
          (isActive ? styles.activeNavLink : styles.navLink)
        }
      >
        <p className="text text_type_main-medium text_color_inactive">Выход</p>
      </NavLink>
    </>
  );
};
