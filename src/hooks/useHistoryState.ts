import { useReducer } from "react";
import type { InitialState } from "../types/HistoryTypes";
import type { Account } from "../types/AccountTypes";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../services/supabase/supabase";
import type { History } from "../types/HistoryTypes";

const initialState = {
  error: "",
  loading: false,
  history: [],
}

export type Action =
  { type: "CHANGE_LOADING", payload: boolean } |
  { type: "SET_ERROR", payload: string } |
  { type: "SET_HISTORY", payload: History[] }

const reducer = (state: InitialState, action: Action) => {

  switch (action.type) {

    case "CHANGE_LOADING": {
      return { ...state, loading: action.payload }
    }

    case "SET_ERROR": {
      return { ...state, error: action.payload }
    }

    case "SET_HISTORY": {
      return { ...state, history: action.payload }
    }

    default: return state

  }

}

export const useHistoryState = (account: Account | null, user: User | null) => {

  const [history, dispatchHistory] = useReducer(reducer, initialState)

  const loadHistory = async () => {

    dispatchHistory({ type: "CHANGE_LOADING", payload: true })
    dispatchHistory({ type: "SET_ERROR", payload: "" })

    const { data, error } = await supabase
      .from("history")
      .select("*")
      .or(
        `sender_id.eq.${user?.id},recipient_number.eq.${account?.account_number}`
      );

    if (error) {
      dispatchHistory({ type: "SET_ERROR", payload: error.message })
      dispatchHistory({ type: "CHANGE_LOADING", payload: false })
      console.log(`Error is load all history: ${error.message}`);
    }

    dispatchHistory({ type: "SET_HISTORY", payload: data ?? [], })

    dispatchHistory({ type: "CHANGE_LOADING", payload: false })

  }

  const setHistory = async (type: string, sum: number, recipient: string) => {


    const { error } = await supabase
      .from("history")
      .insert({
        type: type,
        sum: sum,
        sender_name: `${user?.user_metadata.name} ${user?.user_metadata.surename}`,
        sender_number: account?.account_number,
        status: true,
        sender_id: account?.user_id,
        recipient_number: recipient
      });

    console.log("History add!")

    if (error) {
      dispatchHistory({ type: "SET_ERROR", payload: "Error on add history" })
      console.error(error.message);
      return;
    }

  }

  const loadSoloHistory = async (id: number) => {

    dispatchHistory({ type: "CHANGE_LOADING", payload: true })
    dispatchHistory({ type: "SET_ERROR", payload: "" })

    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      dispatchHistory({ type: "SET_ERROR", payload: error.message })
      dispatchHistory({ type: "CHANGE_LOADING", payload: false })
      console.log(`Error is load solo history: ${error.message}`);
    }

    dispatchHistory({ type: "CHANGE_LOADING", payload: false })

    return data

  }



  return { loadHistory, setHistory, history, dispatchHistory, loadSoloHistory }

}