import React, { FC, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { ProfileNavigation } from "./ProfileNavigation";
import styles from "./Profile.module.css";
import { BURGER_WSS, WebsocketStatus } from "../../utils/data";
import { OrderCard } from "../../copmonents/OrderCard/OrderCard";
import { selectOrder } from "../../services/slices/SelectedOrder";
import { connect, disconnect } from "../../services/actions/WsProfile";
import { TOrder } from "../../utils/types";

export const OrdersHistory: FC = () => {
  const dispatch = useAppDispatch();
  const { wsMessage,status } = useAppSelector((store) => store.wsProfile);
  const { orders } = wsMessage || {};

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (status === WebsocketStatus.OFFLINE)
    dispatch(connect(`${BURGER_WSS}orders?token=${accessToken}`));

}, []);
  
  
const reversedOrders = useMemo<Array<TOrder>>(() => {
  const reversed = orders?.slice()?.reverse();
  return reversed || [];
}, [orders]);

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <ProfileNavigation />
        <p className="text text_type_main-default text_color_inactive mt-20 ml-5">
          В этом разделе вы можете
          <br />
          посмотреть свою историю заказов
        </p>
      </div>

      <div className={styles.orders + " ml-15 pr-2"}>
        {reversedOrders?.map((nextOrder) => (
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
  );
};
