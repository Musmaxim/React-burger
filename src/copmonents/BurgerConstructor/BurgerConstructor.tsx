import React, { useMemo, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderDetails } from "../Modals/OrderDetails/OrderDetails";
import Modal from "../Modals/Modal/Modal";
import { DragIngredients } from "../DragIngredients/DragIngredients";
import styles from "./BurgerConstructor.module.css";
import { addIngredient } from "../../services/actions/BurgerConstructor";
import { createOrder } from "../../services/actions/Order";
import { clearOrderNum } from "../../services/slices/Order";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { TDragged } from "../../utils/types";
import { Loader } from "../Loader/Loader";

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { bun, another } = useAppSelector((store) => store.burgerConstructor);

  const fullData = useMemo(
    () => [...another, bun].filter((nextItem) => nextItem),
    [bun, another]
  );

const fullPrice = useMemo(
  () =>
    fullData.reduce(
      (sum, nextItem) => (nextItem?.type === "bun" ? sum + (nextItem.price ?? 0) * 2 : sum + (nextItem?.price ?? 0)),
      0
    ),
  [fullData]
);

  const dispatch = useAppDispatch();

  const { numbOrder, status } = useAppSelector((store) => store.order);

  const { user } = useAppSelector((store) => store.user);

  const handleOpenModal = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(createOrder(fullData));
    }
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TDragged) {
      dispatch(addIngredient(item.ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <section
      className={styles.container + " pt-25" + (isHover ? styles.isHover : "")}
      ref={dropRef}
      data-testid={"constructorContainer"}
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
      <div className={styles.list + " pr-4 pl-4"}>
        {another.map((ingredient, index) => (
          <DragIngredients
            key={ingredient.id}
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
          onClick={handleOpenModal}
          data-testid={"btnMakeOrder"}
        >
          Оформить заказ
        </Button>
      </footer>
      {(status !== "idle" || numbOrder) && (
        <Modal onClose={() => dispatch(clearOrderNum())}>
          {status === "loading" ? (
            <Loader />
          ) : (
            numbOrder && <OrderDetails numbOrder={numbOrder} />
          )}
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
