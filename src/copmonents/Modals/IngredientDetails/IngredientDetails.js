import React from "react";
import styles from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const { ingredient } = useSelector(store => store.modal);
  return (
    <div className={styles.content}>
      <img className="mb-4" src={ingredient.image_large} alt={ingredient.name} />
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
