import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const navClass = `${styles.nav} mr-2 mt-4 mb-4 pl-5 pr-5`;

const AppHeader = (props) => {
  return (
    <header className={styles.container}>
      <nav className={navClass}>
        <BurgerIcon type="primary" />
        <p className="text text_type_main-default ml-2">Конструктор</p>
      </nav>
      <nav className={navClass}>
        <ListIcon type="primary" />
        <p className="text text_type_main-default ml-2">Лента заказов</p>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={navClass}>
        <ProfileIcon type="primary" />
        <p className="text text_type_main-default ml-2">Личный кабинет</p>
      </nav>
    </header>
  );
};

export default AppHeader;
