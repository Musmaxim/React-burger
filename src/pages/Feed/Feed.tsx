import React, { useEffect, useMemo } from "react";
import styles from "./Feed.module.css";
import { OrderCard } from "../../copmonents/OrderCard/OrderCard";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { connect, disconnect } from "../../services/actions/WsFeed";
import { BURGER_WSS, WebsocketStatus } from "../../utils/data";
import { selectOrder } from "../../services/slices/SelectedOrder";

export const Feed = () => {
  const { wsMessage,status } = useAppSelector((store) => store.wsFeed);
  const { orders, total, totalToday } = wsMessage || {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === WebsocketStatus.OFFLINE)
    dispatch(connect(`${BURGER_WSS}orders/all`));
}, []);

  const done = useMemo(() => {
    return orders?.filter((order) => order.status === "done");
  }, [orders]);
  const work = useMemo(() => {
    return orders?.filter((order) => order.status !== "done");
  }, [orders]);

  return (
    <div className={styles.main + " ml-6"}>
      <div className={styles.orders}>
        <p className="text text_type_main-medium mt-10 mb-5">Лента заказов</p>
        <div className={styles.ordersBoard + " pr-2"}>
          {orders?.map((nextOrder) => (
            <OrderCard
              key={nextOrder._id}
              data={nextOrder}
              onClick={() => {
                dispatch(selectOrder(nextOrder));
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.queue + " pl-15"}>
        <div className={styles.numbers + " mb-15"}>
          <div className={styles.columns + " mr-9"}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <div className={styles.done}> {done?.map((order) => (
              <p
                key={order._id}
                className="text text_type_digits-default"
              >
                {order.number}
              </p>
            ))}</div>
          </div>
          <div className={styles.columns}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <div className={styles.inWork}>
            {work?.map((order) => (
              <p
                key={order._id}
                className="text text_type_digits-default"
              >
                {order.number}
              </p>
            ))}
            </div>
          </div>
        </div>
        <div className={styles.total + " mb-15"}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.total}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  );
};
