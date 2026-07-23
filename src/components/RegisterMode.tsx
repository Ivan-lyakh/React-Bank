import styles from "../styles/Auth.module.css"


export const RegisterMode = () => {
  return (
    <div className={styles.mode}>

      <div className={styles.modeBody}>

        <div className={styles.modeColumn}>
          <h2>Email:</h2>
          <input type="email" />
        </div>

        <div className={styles.modeColumn}>
          <h2>Name:</h2>
          <input type="text" />
        </div>

        <div className={styles.modeColumn}>
          <h2>Password:</h2>
          <input type="text" />
        </div>

        <div className={styles.modeColumn}>
          <h2>Age:</h2>
          <input type="number" />
        </div>



      </div>

      <button className="button">Открыть сщет!</button>
    </div>
  )
}