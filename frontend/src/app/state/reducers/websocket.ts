import { AppActions } from '../app-actions';
import * as WebSocketActions from '../actions/websocket';

import * as WebSocket from '../../websocket';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'duplicate' | 'connected';

export interface WebSocketState {
  connectionStatus: ConnectionStatus;
  error: string | null;
  requests: { [nonce: string]: WebSocket.Request };
}
const initialState: WebSocketState = {
  connectionStatus: 'disconnected',
  error: null,
  requests: {},
};

export function websocketReducer(
  state: WebSocketState = initialState,
  action: AppActions
) {
  switch (action.type) {
    case WebSocketActions.CONNECT:
      return { ...initialState, connectionStatus: 'connecting' };
    case WebSocketActions.CONNECTED:
      return { ...initialState, connectionStatus: 'connected' };
    case WebSocketActions.DISCONNECT:
      if (state.connectionStatus === 'duplicate') {
        // duplicate implies disconnected
        return { ...state, connectionStatus: 'disconnected' };
      } else {
        return state;
      }
    case WebSocketActions.DISCONNECTED:
      if (state.connectionStatus === 'duplicate') {
        return { ...initialState, connectionStatus: 'duplicate' };
      } else {
        return initialState;
      }
    case WebSocketActions.WS_ERROR:
      return { ...state, error: String(action.error) };
    case WebSocketActions.DUPLICATE_SESSION:
      return { ...state, connectionStatus: 'duplicate' };
    case WebSocketActions.REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.nonce]: action.request,
        },
      };
    case WebSocketActions.RESPONSE: {
      const requests = { ...state.requests };
      delete requests[action.nonce];
      return {
        ...state,
        requests,
      };
    }
    default:
      return state;
  }
}
