import React, { useEffect, FC } from "react";
import styles from "./OrderDetails.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useIngredients } from "../../hooks/useIngredients";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { useLocation, useParams } from "react-router-dom";
import { getOrderStatus, getTotalPrice } from "../../utils/utils";
import { getOrder } from "../../services/actions/Order";

type TOrderDetails = {
  inModal?: boolean;
};

export const OrderDetails: FC<TOrderDetails> = ({ inModal }) => {
  const location = useLocation();
  const { wsMessage } = useAppSelector((store) =>
    location.pathname.startsWith("/feed") ? store.wsFeed : store.wsProfile
  );

  const { id } = useParams();
  const { orders } = wsMessage || {};
  const wsOrder = orders?.find(
    (nextOrder) => nextOrder.number.toString() === id
  );
  const { order } = useAppSelector((store) => {
    return { order: wsOrder || store.order.order };
  });
  const { name, status, number, createdAt } = order || {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && !wsOrder) {
      dispatch(getOrder(id));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { ingredients } = useIngredients(order?.ingredients || []);
  const price = ingredients?.reduce(getTotalPrice, 0);

  return (
    order && (
      <div className={`${styles.main} ${!inModal ? styles.withoutModal : ""}`}>
        <p className={styles.title + " text text_type_digits-default mb-10"}>
          #{number}
        </p>
        <p className="text text_type_main-medium mb-3">{name}</p>
        <p className={styles.status + " text text_type_main-default mb-15"}>
          {status ? getOrderStatus(status) : null}
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={styles.ingredients + " mb-10 pr-6"}>
          {ingredients?.map((nextItem) => {
            return (
              <div key={nextItem._id} className={styles.ingredient + " mb-4"}>
                <span className={styles.circle + " mr-4"}>
                  <img src={nextItem.image} alt={nextItem._id} />
                </span>
                <p
                  className={styles.name + " text text_type_main-default mr-4"}
                >
                  {nextItem.name}
                </p>
                <div className={styles.price}>
                  <p className="text text_type_digits-default pr-1">
                    {nextItem.count} x {nextItem.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt + "")} />
          </p>
          <div className={styles.price}>
            <p className="text text_type_digits-default pr-1">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  );
};
