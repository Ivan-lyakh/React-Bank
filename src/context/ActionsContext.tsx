import { createContext } from "react";
import type { ActionsAction, InitalState } from "../types/ActionsTypes";
import type { Action } from "../hooks/useActionsState";




type ActionsContext = {
  actions: InitalState,
  actionsAction: ActionsAction,
  dispatchActions: React.Dispatch<Action>
}

export const ActionsContext = createContext<null | ActionsContext>(null)