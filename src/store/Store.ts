import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../services/reducers/Index";
import { socketMiddleware } from "../services/middlewares/SocketMiddleware";
import {
  connect as FeedWsConnect,
  disconnect as FeedWsDisconnect,
  wsConnecting as FeedWsConnecting,
  wsOpen as FeedWsOpen,
  wsClose as FeedWsClose,
  wsMessage as FeedWsMessage,
  wsError as FeedWsError,
} from "../services/actions/WsFeed";

import {
  connect as ProfileWsConnect,
  disconnect as ProfileWsDisconnect,
  wsConnecting as ProfileWsConnecting,
  wsOpen as ProfileWsOpen,
  wsClose as ProfileWsClose,
  wsMessage as ProfileWsMessage,
  wsError as ProfileWsError,
} from "../services/actions/WsProfile";

const wsFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onMessage: FeedWsMessage,
  onError: FeedWsError,
};

const wsProfileActions = {
  wsConnect: ProfileWsConnect,
  wsDisconnect: ProfileWsDisconnect,
  wsConnecting: ProfileWsConnecting,
  onOpen: ProfileWsOpen,
  onClose: ProfileWsClose,
  onMessage: ProfileWsMessage,
  onError: ProfileWsError,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsFeedActions),
      socketMiddleware(wsProfileActions)
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
