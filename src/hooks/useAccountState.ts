
import { useReducer } from "react"
import type { Account, InitialState } from "../types/AccountTypes"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../services/supabase/supabase"


const initialState = {
  error: "",
  loading: false,
  account: null
}

export type Action =
  | { type: "CHANGE_LOADING", payload: boolean }
  | { type: "SET_ERROR", paylod: string }
  | { type: "SET_ACCOUNT", payload: Account }
  | { type: "RESET_ACCOUNT" }


const reducer = (state: InitialState, action: Action) => {

  switch (action.type) {

    case "CHANGE_LOADING": {
      return { ...state, loading: true }
    }

    case "SET_ERROR": {
      return { ...state, error: action.paylod }
    }

    case "SET_ACCOUNT": {
      return { ...state, account: action.payload }
    }

    case "RESET_ACCOUNT": {
      return initialState
    }

    default: return state
  }

}

export const useAccountState = () => {

  const [account, dispatchAccount] = useReducer(reducer, initialState)

  const loadAccount = async (user: User) => {

    dispatchAccount({ type: "SET_ERROR", paylod: "" })

    dispatchAccount({ type: "CHANGE_LOADING", payload: true })

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (error) {
      dispatchAccount({ type: "SET_ERROR", paylod: error.message })
      dispatchAccount({ type: "CHANGE_LOADING", payload: false })
      console.log(`Error is load account: ${error.message}`);
      return
    }

    dispatchAccount({ type: "SET_ACCOUNT", payload: data })

    dispatchAccount({ type: "CHANGE_LOADING", payload: false })

  }

  const accoutActions = { loadAccount }

  return { account, dispatchAccount, accoutActions }

}