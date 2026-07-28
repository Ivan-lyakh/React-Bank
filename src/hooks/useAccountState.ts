
import { useReducer, useState } from "react"
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

export const useAccountState = () => {

  const [account, dispatchAccount] = useReducer(reducer, initialState)

  const [accountLoading, setAccoutLoading] = useState(true)


  const loadAccount = async (user: User | null) => {

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

  }

  /*
  
    const changeBalance = async (user: User, value: number, mode: "deposit" | "windtraw") => {
  
      switch (mode) {
  
        case "deposit": {
  
          try {
  
            dispatchAccount({ type: "SET_ERROR", payload: "" })
  
            dispatchAccount({ type: "CHANGE_LOADING", payload: true })
  
            if (account.account) {
  
              setAccoutLoading(true)
  
              const newBalance = account.account?.balance + value
  
              const { error } = await supabase
                .from("accounts")
                .update({
                  balance: newBalance,
                })
                .eq("user_id", user.id);
  
              if (error) {
                dispatchAccount({ type: "SET_ERROR", payload: error.message })
                console.log("Ошибка при попытке депозита!")
              }
  
              loadAccount(user)
  
            }
          }
  
          finally {
            dispatchAccount({ type: "CHANGE_LOADING", payload: false })
            setAccoutLoading(false)
            scrollToTop()
          }
  
          break
  
        }
  
  
  
        case "windtraw": {
  
          try {
  
            dispatchAccount({ type: "SET_ERROR", payload: "" })
  
            dispatchAccount({ type: "CHANGE_LOADING", payload: true })
  
            if (account.account) {
  
              setAccoutLoading(true)
  
              const newBalance = account.account?.balance - value
  
              const { error } = await supabase
                .from("accounts")
                .update({
                  balance: newBalance,
                })
                .eq("user_id", user.id);
  
              if (error) {
                dispatchAccount({ type: "SET_ERROR", payload: error.message })
                console.log("Ошибка при попытке снятие денег!")
              }
  
            }
  
            loadAccount(user)
          }
  
          finally {
            dispatchAccount({ type: "CHANGE_LOADING", payload: false })
            setAccoutLoading(false)
            scrollToTop()
          }
  
        }
  
      }
  
    }
  
    const transfer = async (user: User, where: string, sum: number) => {
  
      try {
  
        dispatchAccount({ type: "SET_ERROR", payload: "" })
  
        dispatchAccount({ type: "CHANGE_LOADING", payload: true })
  
        if (account.account) {
  
          setAccoutLoading(true)
  
  
          if (account.account?.balance < sum) {
            dispatchAccount({ type: "SET_ERROR", payload: "Your balance is too low to complete the transfer." })
            return
          }
  
          const balanceWhere = await getActualBalanceWhere(where)
  
          if (balanceWhere === false) {
            console.log("Start")
            dispatchAccount({ type: "SET_ERROR", payload: "The recipient could not be found for the given number!" })
            console.log("Stop")
            return
          }
  
          await changeBalanceFrom(account.account.balance, user, sum)
  
          await changeBalanceWhere(Number(balanceWhere), where, sum)
  
          accoutActions.loadAccount(user)
  
        }
  
      }
  
      finally {
        dispatchAccount({ type: "CHANGE_LOADING", payload: false })
        setAccoutLoading(false)
        scrollToTop()
      }
  
    }
  
    */


  return { account, accountLoading, dispatchAccount, loadAccount }

}