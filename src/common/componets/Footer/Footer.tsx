import styles from './Footer.module.css'
import { GitHub, Telegram, LinkedIn, Instagram } from '@mui/icons-material'

export const Footer = () => (
    <footer className={styles.footer}>
        <p className={styles.copy}>© 2025 Kinopoisk Demo · Data courtesy of <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className={styles.link}>TMDB</a></p>
        <div className={styles.socials}>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className={styles.icon} aria-label="GitHub"><GitHub fontSize="small" /></a>
            <a href="https://t.me/" target="_blank" rel="noreferrer" className={styles.icon} aria-label="Telegram"><Telegram fontSize="small" /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className={styles.icon} aria-label="LinkedIn"><LinkedIn fontSize="small" /></a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className={styles.icon} aria-label="Instagram"><Instagram fontSize="small" /></a>
        </div>
    </footer>
)