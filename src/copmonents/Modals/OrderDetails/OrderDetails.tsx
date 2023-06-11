import React, { FC } from "react";

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderDetails.module.css";

type TOrder = {
  numbOrder: number;
};

export const OrderDetails: FC<TOrder> = ({ numbOrder }) => {
  return (
    <div className={styles.content}>
      <p className={styles.order + " text text_type_digits-large mb-8"}>
        {numbOrder}
      </p>
      <p className="text text_type_main-medium mb-10">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-default mb-2 mt-10">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
