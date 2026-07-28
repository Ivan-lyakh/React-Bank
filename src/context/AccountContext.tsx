import { createContext } from "react";
import type { InitialState } from "../types/AccountTypes";
import { type Action } from "../hooks/useAccountState";
import { type User } from "@supabase/supabase-js";



type AccountContext = {
  account: InitialState,
  dispatchAccount: React.Dispatch<Action>
  loadAccount: (user: User | null) => Promise<void>
  accountLoading: boolean
}

export const AccountContext = createContext<null | AccountContext>(null)