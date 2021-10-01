import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, CombinedState, combineReducers } from "redux";

import server, { IServerState } from "./server";

type State = {
  server: IServerState;
};

const reducers = (
  state: State | undefined,
  action: AnyAction
): CombinedState<State> => {
  switch (action.type) {
    case HYDRATE:
      if (state?.server.isServerRendered) {
        return { ...state };
      }
      return {
        ...state,
        ...action.payload,
        server: { isServerRendered: true },
      };
    default: {
      const combineReducer = combineReducers({
        server,
      });
      return combineReducer(state, action);
    }
  }
};

export default reducers;
