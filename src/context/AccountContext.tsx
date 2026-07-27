import { createContext } from "react";
import type { InitialState } from "../types/AccountTypes";
import { type Action } from "../hooks/useAccountState";
import { type ActionsAccounts } from "../types/AccountTypes";


type AccountContext = {
  account: InitialState,
  dispatchAccount: React.Dispatch<Action>
  accoutActions: ActionsAccounts
  accountLoading: boolean
}

export const AccountContext = createContext<null | AccountContext>(null)