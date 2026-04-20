import { useNavigate } from 'react-router-dom'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import styles from './notFoundPage.module.css'

export const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <MovieFilterIcon className={styles.icon} />
            <h1 className={styles.code}>404</h1>
            <p className={styles.title}>Страница не найдена</p>
            <p className={styles.subtitle}>Похоже, такого маршрута не существует</p>
            <button className={styles.btn} onClick={() => navigate('/')}>
                На главную
            </button>
        </div>
    )
}