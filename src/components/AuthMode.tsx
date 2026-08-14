import styles from '../styles/Auth.module.css'

import { useState } from 'react'
import { useUser } from '../hooks/useUser'
import { useTranslation } from 'react-i18next'

import closed from '../images/closedEayes.png'
import open from '../images/openEayes.png'
import { Loading } from './Loading/Loading'
import { ErrorModal } from './Error/ErrorModal'

type Props = {
  mode: string
}

export const AuthMode = (props: Props) => {

  const [secretPassword, setSecretPassword] = useState(true)

  const { auth, dispatch, actionsUser } = useUser()

  const { t } = useTranslation();


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
          <h2>{t("common.email")}:</h2>
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
          <h2>{t("common.password")}:</h2>

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
              <h2>{t("auth.name")}:</h2>

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
              <h2>{t("auth.surname")}:</h2>

              <input
                type="text"
                value={auth.form.surename}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FORM_FIELD",
                    payload: { field: "surename", value: e.target.value }
                  })
                }
              />
            </div>

            <div className={styles.modeColumn}>
              <h2>{t("auth.age")}:</h2>

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
            if (auth.form.password.length < 6) {
              dispatch({ type: "CHANGE_ERROR", payload: t("error.authShortPassword") })
              return
            }
            if (!auth.form.name) {
              dispatch({ type: "CHANGE_ERROR", payload: t("error.authEmptyField") })
              return
            }
            if (!auth.form.age) {
              dispatch({ type: "CHANGE_ERROR", payload: t("error.authEmptyField") })
              return
            }
            actionsUser.handleRegister();
            return
          }

          actionsUser.handleLogin();
        }}

      >
        {t(props.mode === "auth" ? "auth.btnLogin" : "auth.btnRegister")}
      </button>

    </div>
  );

}
