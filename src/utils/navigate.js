import { BUN, MAIN, SAUCE } from "./data";

export const getBun = (arr) => {
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

export const categories = [
  {
    type: BUN,
    title: "Булки",
    data: [],
  },
  {
    type: MAIN,
    title: "Начинки",
    data: [],
  },
  {
    type: SAUCE,
    title: "Соусы",
    data: [],
  },
];

export const getСategory = (data) => {
  const categoryData = JSON.parse(JSON.stringify(categories));

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
