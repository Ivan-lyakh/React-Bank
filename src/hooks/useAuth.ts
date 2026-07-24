import { useEffect, useReducer, useState } from "react"
import type { InitialState } from "../types/AuthTypes"
import { supabase } from "../services/supabase/supabase"
import type { User } from "@supabase/supabase-js"
import { createAccount } from "../utils/AuthHelpers"

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

export type Action =
  | { type: "CHANGE_LOADING", payload: boolean }
  | { type: "CHANGE_ERROR", payload: string }
  | { type: "RESET_USERS" }
  | { type: "SET_FORM_FIELD", payload: { field: string, value: string } }


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

    case "RESET_USERS": {
      return { ...initialState }
    }

    default: return state

  }

}

export const useAuth = () => {

  const [auth, dispatch] = useReducer(reducer, initialState)

  const [user, setUser] = useState<null | User>(null)

  const [loadingUser, setLoadingUser] = useState(true);

  console.log(user)


  useEffect(() => {
    async function loadUsers() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {

        setUser(data.user)

        setLoadingUser(false);

      }


    }

    loadUsers()
  }, [])

  const handleRegister = async () => {
    dispatch({ type: "CHANGE_ERROR", payload: "" });
    dispatch({ type: "CHANGE_LOADING", payload: true });

    const { data, error } = await supabase.auth.signUp({
      email: auth.form.email,
      password: auth.form.password,
      options: {
        data: {
          name: auth.form.name,
          age: auth.form.age,
        },
      },
    });

    if (error) {
      dispatch({ type: "CHANGE_ERROR", payload: error.message });
      dispatch({ type: "CHANGE_LOADING", payload: false });
      return;
    }

    if (data.user) {
      setUser(data.user);

      await createAccount(data.user.id);

      setLoadingUser(false)
    }

    dispatch({ type: "CHANGE_LOADING", payload: false });
  };


  const handleLogin = async () => {

    dispatch({ type: "CHANGE_ERROR", payload: "" })

    dispatch({ type: "CHANGE_LOADING", payload: true })

    const { data, error } = await supabase.auth.signInWithPassword({
      email: auth.form.email,
      password: auth.form.password,
    });

    if (error) {
      dispatch({ type: "CHANGE_ERROR", payload: error.message })
      dispatch({ type: "CHANGE_LOADING", payload: false })
    }

    setUser(data.user)

    dispatch({ type: "CHANGE_LOADING", payload: false })



  }

  const actionsUser = { handleRegister, handleLogin }


  return { auth, dispatch, user, actionsUser, loadingUser }

}