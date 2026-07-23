import { useReducer } from "react"
import type { InitialState } from "../types/AuthTypes"


const initialState = {
  error: "",
  loading: false,
  form: {
    email: "",
    password: "",
    name: "",
    age: "",
  },
}

type Action =
  | { type: "CHANGE_LOADING", payload: boolean }
  | { type: "CHANGE_ERROR", payload: string }
  | { type: "RESET_USERS" }
  | {
    type: "SET_FORM_FIELD",
    payload: {
      field: string,
      value: string
    }
  }


const reducer = (state: InitialState, action: Action) => {

  switch (action.type) {

    case "CHANGE_LOADING": {
      return { ...state, loading: action.payload }
    };

    case "CHANGE_ERROR": {
      return { ...state, error: action.payload }
    }

    case "SET_FORM_FIELD": {
      return {
        ...state, form: {
          ...state.form, [action.payload.field]: action.payload.value
        }
      }
    }

    default: return state

  }

}

export const useAuth = () => {

  const [auth, dispatch] = useReducer(reducer, initialState)

  return { auth, dispatch }

}