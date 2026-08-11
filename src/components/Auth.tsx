import styles from '../styles/Auth.module.css'
import ReactLogo from '../images/ReactLogo.png'
import { useState } from 'react'
import { AuthMode } from './AuthMode'


export const Auth = () => {

  const [mode, setMode] = useState("")

  return (
    <div>
      <div className={styles.main}>
        <div className='container'>
          <div className={styles.body}>

            <div className={styles.header}>
              <h2 className="title">Welcome to <span>React-Bank!</span></h2>
              <img src={ReactLogo} alt="#logo" />
            </div>


            {mode === ""

              ?

              <div>
                <div className={styles.innerContainer}>
                  <div className={styles.card}>
                    <h2 className='text'>If you are visiting us for the first time, click the button to open an account with our bank!</h2>

                    <button className='button' onClick={() => setMode("register")} >Open an account!</button>

                  </div>

                  <div className={styles.card}>
                    <h2 className='text'>If you are already a customer, you can log in right now without any issues!</h2>

                    <button className='button' onClick={() => setMode("auth")} >Login</button>
                  </div>
                </div>
              </div>

              : <AuthMode mode={mode} />

            }


          </div>
        </div>
      </div>
    </div>
  )
}