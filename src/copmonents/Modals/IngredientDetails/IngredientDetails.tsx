import React, { FC } from "react";
import styles from "./IngredientDetails.module.css";
import { useAppSelector } from "../../../store/Hooks";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../../utils/types";

type TIngredientState = {
  ingredients: TIngredient[] | null;
  request: boolean;
  failed: boolean;
};

const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();
  const { ingredient } = useAppSelector((store) => store.selectedIngredient);
  const { ingredients } = useAppSelector<TIngredientState>(
    (store) => store.ingredients
  );
  const currentIngredient =
    ingredient ||
    ingredients?.find((nextIngredient) => nextIngredient._id === ingredientId);

  return currentIngredient ? (
    <div className={styles.content}>
      <h1 className="text text_type_main-large pt-10">Детали ингредиента</h1>
      <img
        className="mb-4"
        src={currentIngredient.image_large}
        alt={currentIngredient.name}
      />
      <p className="text text_type_main-medium mb-8">
        {currentIngredient.name}
      </p>
      <div className={styles.info + " mb-15"}>
        {[
          ["Калории, ккал", currentIngredient.calories],
          ["Белки, г", currentIngredient.proteins],
          ["Жиры, г", currentIngredient.fat],
          ["Углеводы, г", currentIngredient.carbohydrates],
        ].map(([name, value]) => (
          <div key={name} className={styles.param + " mr-5"}>
            <p className="text text_type_main-default text_color_inactive">
              {name}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default IngredientDetails;
