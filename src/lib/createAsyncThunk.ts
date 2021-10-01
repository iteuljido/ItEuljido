import { Dispatch } from "redux";
import { AsyncActionCreatorBuilder } from "typesafe-actions";

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export default function createAsyncThunk<
  A extends AnyAsyncActionCreator,
  F extends (...params: any[]) => Promise<any>
>(asyncActionCreator: A, promiseCreator: F, afterDispatch?: any) {
  type Params = Parameters<F>;
  return function thunk(...params: Params) {
    return async (dispatch: Dispatch) => {
      const { request, success, failure } = asyncActionCreator;
      dispatch(request());

      try {
        const result = await promiseCreator(...params);
        dispatch(success(result));
        if (afterDispatch && typeof afterDispatch === "function") {
          dispatch(afterDispatch());
        }
      } catch (e) {
        dispatch(failure(e));
      }
    };
  };
}
