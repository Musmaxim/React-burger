import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../Modals/OrderDetails/OrderDetails";
import Modal from "../Modals/Modal/Modal";
import { DragIngredients } from "../DragIngredients/DragIngredients";
import { BUN } from "../../utils/data";
import styles from "./BurgerConstructor.module.css";
import { addIngredient } from "../../services/actions/BurgerConstructor";
import { CLOSE_MODAL_ORDER, createOrder } from "../../services/actions/Order";

const BurgerConstructor = () => {
  const { bun, another } = useSelector(store => store.burgerConstructor);
  
  const fullData = useMemo(() => [...another, bun].filter(nextItem => nextItem), [bun, another]);

  const fullPrice = useMemo(() => fullData.reduce((sum, nextItem) =>
        sum + (nextItem.type === BUN ? nextItem.price * 2 : nextItem.price), 0), [fullData]);

  const dispatch = useDispatch();

  const { numbOrder } = useSelector(store => store.order);

  const [{ isHover }, dropRef] = useDrop({
      accept: 'ingredient',
      drop(item) {
        dispatch(addIngredient(item.ingredient));
      },
      collect: monitor => ({
          isHover: monitor.isOver(),
      })
  });

  return (
    <section
      className={styles.container + " pt-25" + (isHover ? styles.isHover : "")}
      ref={dropRef}
    >
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
      <div className={styles.list + " pr-4"}>
        {another.map((ingredient, index) => (
          <DragIngredients
            key={index}
            index={index}
            data={ingredient}
          />
        ))}
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
          <p className="text text_type_main-large pr-1">{fullPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            dispatch(createOrder(fullData));
          }}
        >
          Оформить заказ
        </Button>
      </footer>
      {numbOrder && (
        <Modal
          onClose={() =>
            dispatch({
              type: CLOSE_MODAL_ORDER,
            })
          }
        >
          <OrderDetails numbOrder={numbOrder} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
