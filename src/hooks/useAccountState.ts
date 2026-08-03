
import { useEffect, useReducer, useState } from "react"
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
  | { type: "SET_ERROR", payload: string }
  | { type: "SET_ACCOUNT", payload: Account }
  | { type: "RESET_ACCOUNT" }



const reducer = (state: InitialState, action: Action) => {

  switch (action.type) {

    case "CHANGE_LOADING": {
      return { ...state, loading: action.payload }
    }

    case "SET_ERROR": {
      return { ...state, error: action.payload }
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

export const useAccountState = (user: User | null) => {

  const [account, dispatchAccount] = useReducer(reducer, initialState)

  const [accountLoading, setAccoutLoading] = useState(true)


  const loadAccount = async () => {

    if (user) {
      dispatchAccount({ type: "SET_ERROR", payload: "" })

      dispatchAccount({ type: "CHANGE_LOADING", payload: true })

      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user?.id)
        .single();


      if (error) {
        dispatchAccount({ type: "SET_ERROR", payload: error.message })
        dispatchAccount({ type: "CHANGE_LOADING", payload: false })
        console.log(`Error is load account: ${error.message}`);
        setAccoutLoading(false)
        return
      }

      dispatchAccount({ type: "SET_ACCOUNT", payload: data })


      dispatchAccount({ type: "CHANGE_LOADING", payload: false })

      setAccoutLoading(false)

      console.log("LoadAccount")

      console.log(account.account)

    }

  }

  return { account, accountLoading, dispatchAccount, loadAccount }

}