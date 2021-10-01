import { createReducer } from "typesafe-actions";
import { SET_SERVER_RENDERED } from "./actions";
import { IServerState, ServerAction } from "./types";

export const serverInitialState: IServerState = {
  isServerRendered: false,
};

export default createReducer<IServerState, ServerAction>(serverInitialState, {
  [SET_SERVER_RENDERED]: (_state, _action) => ({
    isServerRendered: true,
  }),
});
