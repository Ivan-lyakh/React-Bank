import { useReducer } from "react"
import type { InitalState } from "../types/ActionsTypes"
import type { Account } from "../types/AccountTypes"
import { type User } from "@supabase/supabase-js"
import { supabase } from "../services/supabase/supabase"
import { scrollToTop } from "../utils/ActionModalHellpers"
import { getActualBalanceWhere } from "../utils/ActionModalHellpers"
import { changeBalanceFrom } from "../utils/ActionModalHellpers"
import { changeBalanceWhere } from "../utils/ActionModalHellpers"

const InitalState = {
  error: "",
  loading: false,
  form: {
    status: "",
    done: false,
    sum: "",
    from: "",
    massege: "",
    date: "",
  },
}


export type Action =
  { type: "CHANGE_LOADING", payload: boolean } |
  { type: "SET_ERROR", payload: string } |
  { type: "SET_FORM_FIELD", payload: { field: string, value: string | boolean } } |
  { type: "RESET_FORM" } 


const reducer = (state: InitalState, action: Action) => {

  switch (action.type) {

    case "CHANGE_LOADING": {
      return { ...state, loading: action.payload }
    }

    case "SET_ERROR": {
      return { ...state, error: action.payload }
    }

    case "SET_FORM_FIELD": {
      return {
        ...state, form: {
          ...state.form, [action.payload.field]: action.payload.value
        }
      }
    }


    case "RESET_FORM": {
      return {
        ...state, form: {
          status: "",
          done: false,
          sum: "",
          from: "",
          massege: "",
          date: "",
        }
      }
    }

    default: return state

  }

}

export const useActionsState = (account: Account | null, loadAccount: (user: User | null) => Promise<void>) => {

  const [actions, dispatchActions] = useReducer(reducer, InitalState)

  const changeBalance = async (user: User | null, value: number, mode: "deposit" | "windtraw") => {

    if (user !== null) {

      switch (mode) {

        case "deposit": {

          try {

            dispatchActions({ type: "SET_ERROR", payload: "" })

            dispatchActions({ type: "CHANGE_LOADING", payload: true })

            if (account) {

              const newBalance = account.balance + value

              const { error } = await supabase
                .from("accounts")
                .update({
                  balance: newBalance,
                })
                .eq("user_id", user.id);

              if (error) {
                dispatchActions({ type: "SET_ERROR", payload: error.message })
                console.log("Ошибка при попытке депозита!")
              }

              loadAccount(user)
              dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "done", value: true } })

            }
          }

          finally {
            dispatchActions({ type: "CHANGE_LOADING", payload: false })
            scrollToTop()
          }

          break

        }




        case "windtraw": {

          try {

            dispatchActions({ type: "SET_ERROR", payload: "" })

            dispatchActions({ type: "CHANGE_LOADING", payload: true })

            if (account) {

              const newBalance = account.balance - value

              const { error } = await supabase
                .from("accounts")
                .update({
                  balance: newBalance,
                })
                .eq("user_id", user.id);

              if (error) {
                dispatchActions({ type: "SET_ERROR", payload: error.message })
                console.log("Ошибка при попытке снятие денег!")
              }

            }

            loadAccount(user)
            dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "done", value: true } })
          }

          finally {
            dispatchActions({ type: "CHANGE_LOADING", payload: false })
            scrollToTop()
          }

        }

      }
    }

  }

  const transfer = async (user: User | null, where: string, sum: number) => {

    if (user !== null) {

      try {

        dispatchActions({ type: "SET_ERROR", payload: "" })

        dispatchActions({ type: "CHANGE_LOADING", payload: true })

        if (account) {

          if (account.balance < sum) {
            dispatchActions({ type: "SET_ERROR", payload: "Your balance is too low to complete the transfer." })
            return
          }

          const balanceWhere = await getActualBalanceWhere(where)

          if (balanceWhere === false) {
            dispatchActions({ type: "SET_ERROR", payload: "The recipient could not be found for the given number!" })
            return
          }

          await changeBalanceFrom(account.balance, user, sum)

          await changeBalanceWhere(Number(balanceWhere), where, sum)

          loadAccount(user)

          dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "done", value: true } })

        }

      }

      finally {
        dispatchActions({ type: "CHANGE_LOADING", payload: false })
        scrollToTop()
      }
    }

  }

  const actionsAction = { transfer, changeBalance }


  return { actions, dispatchActions, actionsAction }

}