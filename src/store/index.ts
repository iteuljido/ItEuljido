import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import reducers from "./reducers";

const configureStore = () => {
  const middlewares = [thunk];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducers, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: false,
});

export type RootState = ReturnType<typeof reducers>;
export const store = configureStore();
export default wrapper;
