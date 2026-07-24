import { useState } from 'react'
import styles from '../styles/Auth.module.css'
import closed from '../images/closedEayes.png'
import open from '../images/openEayes.png'
import { useUser } from '../hooks/useUser'
import { Loading } from './Loading/Loading'
import { ErrorModal } from './Error/ErrorModal'
import { useNavigate } from "react-router-dom";

type Props = {
  mode: string
}

export const AuthMode = (props: Props) => {

  const [secretPassword, setSecretPassword] = useState(true)

  const {auth, dispatch, actionsUser } = useUser()

  const navigate = useNavigate()


  if (auth.loading) {
    return (
      <Loading />
    )
  }

  if (auth.error) {
    return (
      <ErrorModal message={auth.error} />
    )
  }


  return (
    <div className={styles.mode}>

      <div className={styles.modeBody}>

        <div className={styles.modeColumn}>
          <h2>Email:</h2>
          <input
            type="email"
            value={auth.form.email}
            onChange={(e) =>
              dispatch({
                type: "SET_FORM_FIELD",
                payload: { field: "email", value: e.target.value }
              })
            }
          />
        </div>

        <div className={styles.modeColumn}>
          <h2>Password:</h2>

          <div className={styles.passBody}>
            <input
              type={secretPassword ? "password" : "text"}
              value={auth.form.password}
              onChange={(e) =>
                dispatch({
                  type: "SET_FORM_FIELD",
                  payload: { field: "password", value: e.target.value }
                })
              }
            />

            <img
              onClick={() => setSecretPassword(prev => !prev)}
              className={styles.togglePass}
              src={secretPassword ? closed : open}
              alt="#"
            />
          </div>
        </div>

        {props.mode === "register" && (
          <>
            <div className={styles.modeColumn}>
              <h2>Name:</h2>

              <input
                type="text"
                value={auth.form.name}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_FIELD",
                    payload: { field: "name", value: e.target.value }
                  })
                }
              />
            </div>

            <div className={styles.modeColumn}>
              <h2>Age:</h2>

              <input
                type="number"
                value={auth.form.age}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_FIELD",
                    payload: { field: "age", value: e.target.value }
                  })
                }
              />
            </div>
          </>
        )}

      </div>

      <button
        className="button"
        onClick={() => {
          if (props.mode === "register") {
            if (!auth.form.name) {
              dispatch({ type: "CHANGE_ERROR", payload: " Do not leave the fields blank! " })
              return
            }
            if (!auth.form.age) {
              dispatch({ type: "CHANGE_ERROR", payload: " Do not leave the fields blank! " })
              return
            }
            actionsUser.handleRegister();
            navigate("/")
            return
          }

          actionsUser.handleLogin()
          navigate("/")
        }}

      >
        {props.mode === "auth" ? "Войти!" : "Открыть счет!"}
      </button>

    </div>
  );

}
