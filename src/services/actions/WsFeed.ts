import { createAction } from "@reduxjs/toolkit";
import { TWsMessage } from "../../utils/types";

export const connect = createAction<string, "WS_FEED_CONNECT">(
  "WS_FEED_CONNECT"
);
export const disconnect = createAction("WS_FEED_DISCONNECT");
export const wsConnecting = createAction("WS_FEED_CONNECTING");
export const wsOpen = createAction("WS_FEED_OPEN");
export const wsClose = createAction("WS_FEED_CLOSE");
export const wsMessage = createAction<TWsMessage, "WS_FEED_MESSAGE">(
  "WS_FEED_MESSAGE"
);
export const wsError = createAction<string, "WS_FEED_ERROR">("WS_FEED_ERROR");

export type TWsFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
