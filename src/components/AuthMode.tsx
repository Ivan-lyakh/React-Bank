import { useState } from 'react'
import styles from '../styles/Auth.module.css'
import closed from '../images/closedEayes.png'
import open from '../images/openEayes.png'
import { useAuth } from '../hooks/useAuth'

type Props = {
  mode: string
}

export const AuthMode = (props: Props) => {

  const [secretPassword, setSecretPassword] = useState(true)

  const { auth, dispatch } = useAuth()

  return (
    <div className={styles.mode}>

      <div className={styles.modeBody}>

        <div className={styles.modeColumn}>
          <h2>Email:</h2>
          <input
            type="email"
            value={auth.form.email}
            onChange={(e) => dispatch({ type: "SET_FORM_FIELD", payload: { field: "email", value: e.target.value } })} />
        </div>

        <div className={styles.modeColumn}>
          <h2>Password:</h2>
          <div className={styles.passBody}>
            <input
              type={secretPassword ? "password" : "text"}
              value={auth.form.password}
              onChange={(e) => dispatch({ type: "SET_FORM_FIELD", payload: { field: "password", value: e.target.value } })}
            />
            <img onClick={() => setSecretPassword(prev => !prev)} className={styles.togglePass} src={secretPassword ? closed : open} alt="#" />
          </div>
        </div>

        {props.mode === "register" &&

          <div className={styles.modeBody}>
            <div className={styles.modeColumn}>
              <h2>Name:</h2>
              <input
                value={auth.form.name}
                onChange={(e) => dispatch({ type: "SET_FORM_FIELD", payload: { field: "name", value: e.target.value } })}
                type="text" />
            </div>


            <div className={styles.modeColumn}>
              <h2>Age:</h2>
              <input
                type="number"
                value={auth.form.age}
                onChange={(e) => dispatch({ type: "SET_FORM_FIELD", payload: { field: "age", value: e.target.value } })} />
            </div>
          </div>

        }

      </div>

      <button
        className="button"
        onClick={() => {

        }}>
        {props.mode === "auth" ? "Войти!" : "Открыть сщет!"}
      </button>
    </div>
  )
}