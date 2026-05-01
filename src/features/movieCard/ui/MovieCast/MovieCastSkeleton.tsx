import { Box, Skeleton} from '@mui/material'
import styles from './MovieCast.module.css'

export const MovieCastSkeleton = () => {
    return (
        <Box className={styles.container}>
            {/* Заголовок "Cast" */}
            <Skeleton variant="text" width={100} height={32} sx={{ mb: 2 }} />

            <Box className={styles.list} sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
                {/* Отрисовываем 6-8 карточек актеров как заглушки */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <Box key={index} className={styles.actor} sx={{ textAlign: 'center' }}>
                        {/* Круглый аватар */}
                        <Skeleton
                            variant="circular"
                            width={150}
                            height={150}
                            sx={{ mb: 1 }}
                        />

                        {/* Имя актера */}
                        <Skeleton
                            variant="text"
                            width="80%"
                            sx={{ mx: 'auto' }}
                        />

                        {/* Роль */}
                        <Skeleton
                            variant="text"
                            width="60%"
                            sx={{ mx: 'auto' }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
