import { useEffect, useReducer, useState } from "react"
import type { InitialState } from "../types/AuthTypes"
import { supabase } from "../services/supabase/supabase"
import type { User } from "@supabase/supabase-js"
import { createAccount } from "../utils/AuthHelpers"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const initialState = {
  error: "",
  loading: false,
  form: {
    email: "",
    password: "",
    name: "",
    surename: "",
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

  const navigate = useNavigate()

  const [auth, dispatch] = useReducer(reducer, initialState)

  const [user, setUser] = useState<null | User>(null)

  const [loadingUser, setLoadingUser] = useState(true);

  const { t } = useTranslation();

  async function loadUsers() {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error)
      return
    }

    if (data.user) {
      setUser(data.user)
    }
  } finally {
    setLoadingUser(false)
  }
}

  useEffect(() => {

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
          surename: auth.form.surename
        },
      },
    });

    if (error) {
      dispatch({ type: "CHANGE_ERROR", payload: t("error.authRegister") });
      dispatch({ type: "CHANGE_LOADING", payload: false });
    }

    if (data.user) {
      setUser(data.user);

      await createAccount(data.user.id);

    }

    dispatch({ type: "CHANGE_LOADING", payload: false });
    setLoadingUser(false)

  };

  const stopLoadingUser = () => {
    setLoadingUser(false)
  }


  const handleLogin = async () => {

    dispatch({ type: "CHANGE_ERROR", payload: "" })

    dispatch({ type: "CHANGE_LOADING", payload: true })

    const { data, error } = await supabase.auth.signInWithPassword({
      email: auth.form.email,
      password: auth.form.password,
    });

    if (error) {
      dispatch({ type: "CHANGE_ERROR", payload: t("error.authLogin") })
      dispatch({ type: "CHANGE_LOADING", payload: false })
      setLoadingUser(false)
      return
    }

    setUser(data.user)

    dispatch({ type: "CHANGE_LOADING", payload: false })

  }

  const handleLogout = async () => {

    dispatch({ type: "CHANGE_ERROR", payload: "" })

    dispatch({ type: "CHANGE_LOADING", payload: true })

    const { error } = await supabase.auth.signOut();

    if (error) {
      dispatch({ type: "CHANGE_ERROR", payload: error.message })
      dispatch({ type: "CHANGE_LOADING", payload: false })
    }

    setUser(null)

    navigate("/auth")

    dispatch({ type: "CHANGE_LOADING", payload: false })

  }



  const actionsUser = { handleRegister, handleLogin, handleLogout, stopLoadingUser }


  return { auth, dispatch, user, actionsUser, loadUsers, loadingUser }

}