import { Outlet, useNavigate } from 'react-router-dom'
import { Icon } from '@jennychen/sideproject-ds'
import { useTheme } from '@/context/ThemeContext'
import styles from './Layout.module.css'

export default function Layout() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <button className={styles.logoBtn} onClick={() => navigate('/')} aria-label="回到首頁">
          <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="貓蝸" width="40" height="40" />
        </button>
        <div className={styles.headerButtons}>
          <button className={styles.iconBtn} aria-label="切換深色模式" onClick={toggleTheme}>
            <Icon name="refresh" size="md" />
          </button>
          <button className={styles.iconBtn} aria-label="地球">
            <Icon name="globe" size="md" />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>made by Jenny Chen</span>
        <span>Privacy Policy</span>
      </footer>
    </div>
  )
}
