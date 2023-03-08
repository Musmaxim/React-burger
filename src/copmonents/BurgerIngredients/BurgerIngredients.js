import {useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../IngredientCard/IngredientCard";
import PropTypes from "prop-types";
import { dataType } from "../../utils/dataType";
import styles from "./BurgerIngredients.module.css";

const categories = [
  {
    type: "bun",
    title: "Булки",
    data: [],
  },
  {
    type: "sauce",
    title: "Соусы",
    data: [],
  },
  {
    type: "main",
    title: "Начинки",
    data: [],
  },
];

const getСategorizedData = (data) => {
  const categorizedData = JSON.parse(JSON.stringify(categories));

  data.forEach((ingredient) => {
    const category = categorizedData.find(
      (nextCat) => nextCat.type === ingredient.type
    );
    if (category) {
      category.data.push(ingredient);
    }
  });
  return categorizedData;
};

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState(categories[0]);
  const data = getСategorizedData(props.data);

  return (
    <section className={styles.container + " mr-10"}>
      <p className={styles.title + " text text_type_main-medium mt-10 mb-5"}>
        Соберите бургер
      </p>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <Tab
            key={category.type}
            value={category.title}
            active={current === category.title}
            onClick={setCurrent}
          >
            {category.title}
          </Tab>
        ))}
      </div>
      <div className={styles.categories}>
        {data.map((category) => (
            <div key={category.type} className={styles.category}>
              <p className="text text_type_main-default mt-10">
                {category.title}
              </p>
              <div className={styles.ingredients}>
                {category.data.map((ingredient) => (
                  <IngredientCard key={ingredient._id} data={ingredient} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataType).isRequired,
};

export default BurgerIngredients;
