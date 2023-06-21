import { Category } from "./data";
import { TIngredient } from "./types";

export const getBun = (arr: TIngredient[]) => {
  let ifBun = false;
  return arr.filter((ingredient) => {
    if (ingredient.type === "bun") {
      if (ifBun) {
        return false;
      } else {
        ifBun = true;
        return true;
      }
    } else {
      return true;
    }
  });
};

type TCategory = {
  type: Category;
  title: string;
  data: TIngredient[];
};

export const categories = [
  {
    type: Category.BUN,
    title: "Булки",
    data: [],
  },
  {
    type: Category.MAIN,
    title: "Начинки",
    data: [],
  },
  {
    type: Category.SAUCE,
    title: "Соусы",
    data: [],
  },
];

export const getСategory = (data: Array<TIngredient> | null) => {
  const categoryData: TCategory[] = JSON.parse(JSON.stringify(categories));

  if (data) {
    data.forEach((ingredient) => {
      const category = categoryData.find(
        (nextData) => nextData.type === ingredient.type
      );
      if (category) {
        category.data.push(ingredient);
      }
    });
  }

  return categoryData;
};
