import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type ServerAction = ActionType<typeof actions>;

export interface IServerState {
  isServerRendered: boolean;
}
