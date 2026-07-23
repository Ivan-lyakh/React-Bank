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
              <h2 className="title">Добро пожаловать в <span>React-Bank!</span></h2>
              <img src={ReactLogo} alt="#logo" />
            </div>


            {mode === ""

              ?

              <div>
                <div className={styles.innerContainer}>
                  <div className={styles.card}>
                    <h2 className='text'>Если вы впервые у нас , нажмите на кнопку что бы открыть сщет в нашем банке!</h2>

                    <button className='button' onClick={() => setMode("register")} >Открыть сщет!</button>

                  </div>

                  <div className={styles.card}>
                    <h2 className='text'>Если вы уже являетесь нашим клиентом , то без проблем можете войти прямо сейчас!</h2>

                    <button className='button' onClick={() => setMode("auth")} >Войти</button>
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