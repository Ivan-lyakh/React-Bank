import { createContext } from "react";
import type { InitialState } from "../types/AccountTypes";
import { type Action } from "../hooks/useAccountState";



type AccountContext = {
  account: InitialState,
  dispatchAccount: React.Dispatch<Action>
  loadAccount: () => Promise<void>
  accountLoading: boolean

}

export const AccountContext = createContext<null | AccountContext>(null)