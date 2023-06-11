import React, { FC } from "react";
import styles from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { TIngredient } from '../../../utils/types';

type TIngredientState = {
  ingredients: TIngredient[] | null;
  request: boolean;
  failed: boolean;
};

const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();
   // @ts-ignore
  const { ingredients } = useSelector<TIngredientState>(store => store.ingredients);
  const ingredient = ingredients.find((item:any) => item._id === ingredientId);
  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.content}>
      <h1 className="text text_type_main-large pt-10">Детали ингредиента</h1>
      <img
        className="mb-4"
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.info + " mb-15"}>
        {[
          ["Калории, ккал", ingredient.calories],
          ["Белки, г", ingredient.proteins],
          ["Жиры, г", ingredient.fat],
          ["Углеводы, г", ingredient.carbohydrates],
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
  );
};

export default IngredientDetails;
