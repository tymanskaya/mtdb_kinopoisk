import styles from './Footer.module.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Box } from "@mui/material"

export const Footer = () => (
    <Box
        component="footer"
        className={styles.footer}
        sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
            borderTop: '1px solid',
            borderColor: 'divider',
        }}
    >
    <footer className={styles.footer}>
        <div className={styles.inner}>
            <span className={styles.copy}>
                © 2025 Kinopoisk Demo · Data courtesy of{' '}
                <a
                    href="https://www.themoviedb.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    TMDB
                </a>
            </span>

            <div className={styles.socials} >
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    aria-label="GitHub"
                >
                    <GitHubIcon fontSize="small" />
                </a>
                <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    aria-label="Telegram"
                >
                    <TelegramIcon fontSize="small" />
                </a>
            </div>
        </div>
    </footer>
    </Box>
)