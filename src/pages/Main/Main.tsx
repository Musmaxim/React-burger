import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../copmonents/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../copmonents/BurgerConstructor/BurgerConstructor";
import styles from "./Main.module.css";

const Main: FC = () => {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default Main;
