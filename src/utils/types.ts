import { Category, WebsocketStatus } from "./data";

export type TIngredient = {
  _id: string;
  name: string;
  type: Category;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
};

export type TConstructorState = {
  bun: TIngredient | null;
  another: TIngredient[];
};

export type TIngredientState = {
  ingredients: TIngredient[] | null;
  request: boolean;
  failed: boolean;
};

export type TOrderIngredient = TIngredient & {
  count: number;
};

export type TUser = {
  name: string;
  email: string;
  password?: string;
};

export type TUserState = {
  user: TUser | null;
  isAuthChecked: Boolean;
};

export type TForm = {
  name?: string;
  email?: string;
  password?: string;
};

export type TOrderStatus = "created" | "pending" | "done";

export type TOrder = {
  _id: string;
  name: string;
  ingredients: Array<string>;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TWsStore = {
  status: WebsocketStatus;
  error: string;
  wsMessage: TWsMessage | null;
};

export type TWsMessage = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TSelectIngredientState = {
  ingredient: TIngredient | null;
};

export type TSelectedOrderState = {
  order: TOrder | null;
};

export type TOrderState = {
  order: TOrder | null;
  numbOrder: number | null;
  status: "idle" | "loading" | "success" | "failed";
};

export type TDragged = {
  id: number;
  ingredient: TIngredient;
};
