import React, { FC, useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd/dist/hooks";
import { createSelector } from "reselect";
import styles from "./IngredientCard.module.css";
import { TIngredient } from "../../utils/types";
import { useAppSelector } from "../../store/Hooks";

type TConstructorState = {
  bun: TIngredient | null;
  another: TIngredient[];
};

const countSelect = () =>
  createSelector(
    (store: any) => store.burgerConstructor,
    (_: any, data: TIngredient): TIngredient => data,
    ({ bun, another }: TConstructorState, data: TIngredient): number =>
      [...another, bun].filter(
        (nextIngredient) => nextIngredient && nextIngredient._id === data._id
      ).length
  );

type TIngredientCard = {
  data: TIngredient;
  onClick: () => void;
};

const IngredientCard: FC<TIngredientCard> = ({ data }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {
      id: data._id,
      ingredient: data,
    },
  });

  const selectCount = useMemo(countSelect, []);
  const count = useAppSelector((store) => selectCount(store, data));

  return (
    <div className={styles.container + " ml-4 mt-6 mb-10"} ref={dragRef} data-testid={"dragElement"}>
      <img src={data.image} alt={data.name} className="ml-4 mb-1" />
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={styles.price + " mb-2"}>
        <p className={styles.price + " text text_type_main-default pr-2"}>
          {data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.name + " text text_type_main-default"}>
        {data.name}
      </p>
    </div>
  );
};

export default IngredientCard;
