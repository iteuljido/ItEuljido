import { createAction } from "typesafe-actions";

export const SET_SERVER_RENDERED = "server/SET_SERVER_RENDERED";

export const setServerRendered = createAction(SET_SERVER_RENDERED)();
