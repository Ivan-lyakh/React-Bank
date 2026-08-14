
import styles from '../styles/Footer.module.css'

import gitHubLogo from '../images/GitHub_Invertocat_White.png'
import portfolioLogo from '../images/icons8-portfolio-90.png'
import telegramLogo from '../images/telegram.png'

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        <h2 style={{ fontSize: "25px" }}>React-Bank</h2>
      </div>

      <div>
        <div className={styles.box}>
          <h2> Built with React </h2> •
          <h2>TypeScript</h2>•
          <h2>Supabase</h2>
        </div>
      </div>

      <div>
        <div className={styles.box}>
          <h2 className={styles.go}><div className={styles.boxImg}><img src={gitHubLogo} alt="" /></div> <a href="https://github.com/Ivan-lyakh" target="_blank">GitHub</a></h2>
          <h2 className={styles.go}><div className={styles.boxImg}><img src={portfolioLogo} alt="" /></div> <a href="https://github.com/Ivan-lyakh?tab=repositories" target="_blank">Portfolio</a></h2>
          <h2 className={styles.go}><div className={styles.boxImg}><img src={telegramLogo} alt="" /></div> <a href="https://t.me/ivan_lyakh" target="_blank">Contact</a></h2>
        </div>
      </div>

      <div>
        <h2>© 2026 Ivan Lyakh</h2>
      </div>

    </div>
  )
}