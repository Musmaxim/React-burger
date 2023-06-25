import { WebsocketStatus } from "../../utils/data";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/WsFeed";
import { wsFeedReducer } from "./WsFeed";
import { initialState } from "./WsFeed";

describe('wsFeed reducer', () => {
    it('инициализация', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(initialState);
    });

    it('wsConnecting', () => {
        expect(wsFeedReducer(undefined, {
            type: wsConnecting.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        });
    });

    it('wsOpen', () => {
        expect(wsFeedReducer(undefined, {
            type: wsOpen.type
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE,
            error: ''           
        });
    });

    it('wsClose', () => {
        expect(wsFeedReducer(undefined, {
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
        expect(wsFeedReducer(undefined, {
            type: wsMessage.type,
            payload
        })).toEqual({
            ...initialState,
            wsMessage: payload
        });
    });

    it('wsError', () => {
        expect(wsFeedReducer(undefined, {
            type: wsError.type,
            payload: 'test error'
        })).toEqual({
            ...initialState,
            error: 'test error'
        });
    });
});