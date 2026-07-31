import { createContext } from "react";
import type { InitialState } from "../types/HistoryTypes";
import type { Action } from "../hooks/useHistoryState";
import type { Account } from "../types/AccountTypes";



type HistoryContext = {
  history: InitialState,
  dispatchHistory: React.Dispatch<Action>
  loadHistory: (account: Account | null) => Promise<void>
  setHistory: (type: string, sum: number, recipient: string) => Promise<void>
}

export const HistoryContext = createContext<null | HistoryContext>(null)