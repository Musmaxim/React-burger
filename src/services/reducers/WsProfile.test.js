import { WebsocketStatus } from "../../utils/data";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/WsProfile";
import { wsProfileReducer } from "./WsProfile";
import { initialState } from "./WsProfile";

describe('wsProfile reducer', () => {
    it('инициализация', () => {
        expect(wsProfileReducer(undefined, {})).toEqual(initialState);
    });

    it('wsConnecting', () => {
        expect(wsProfileReducer(undefined, {
            type: wsConnecting.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        });
    });

    it('wsOpen', () => {
        expect(wsProfileReducer(undefined, {
            type: wsOpen.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE,
            error: ''
        });
    });

    it('wsClose', () => {
        expect(wsProfileReducer(undefined, {
            type: wsClose.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.OFFLINE
        });
    });

    it('wsMessage', () => {
        const payload = {
            success: true,
            orders: [],
            total: 10,
            totalToday: 1
        };
        expect(wsProfileReducer(undefined, {
            type: wsMessage.type,
            payload
        })).toEqual({
            ...initialState,
            wsMessage: payload
        });
    });

    it('wsError', () => {
        expect(wsProfileReducer(undefined, {
            type: wsError.type,
            payload: 'test error'
        })).toEqual({
            ...initialState,
            error: 'test error'
        });
    });
});