export const BURGER_API = "https://norma.nomoreparties.space/api/";
export const BURGER_WSS = "wss://norma.nomoreparties.space/";

export enum Category {
  BUN = "bun",
  SAUCE = "sauce",
  MAIN = "main",
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const MAX_ORDER_INGREDIENTS = 6;

export const ORDER_STATUS = {
  created: "Создан",
  pending: "В работе",
  done: "Выполнен",
};
