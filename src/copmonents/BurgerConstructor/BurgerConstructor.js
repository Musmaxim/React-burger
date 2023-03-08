import React, { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/dataType";
import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ data }) => {
  const price = 610;

  const bun = data.find((ingredient) => ingredient.type === "bun")
  
  return (
    <section className={styles.container + " pt-25"}>
      {bun && (
        <div className={styles.elementTop + " pl-8"}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={styles.list}>
        {data.map(
          (ingredient) =>
          ingredient.type !== "bun" && (
              <div key={ingredient._id} className={styles.element}>
                <div className={styles.dragIcon}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  type=""
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </div>
            )
        )}
      </div>
      {bun && (
        <div className={styles.elementBottom + " pl-8 mb-10"}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <footer className={styles.footer}>
        <div className={styles.price + " mr-10"}>
          <p className="text text_type_main-large pr-1">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataType).isRequired,
};

export default BurgerConstructor;
