import { createContext } from "react";
import type { History, InitialState } from "../types/HistoryTypes";
import type { Action } from "../hooks/useHistoryState";




type HistoryContext = {
  history: InitialState,
  dispatchHistory: React.Dispatch<Action>
  loadHistory: () => Promise<void>
  setHistory: (type: string, sum: number, recipient: string) => Promise<void>
  loadSoloHistory: (id: number) => Promise<History>
}

export const HistoryContext = createContext<null | HistoryContext>(null)