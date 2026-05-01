import { Box, Skeleton, Typography } from '@mui/material'
import styles from './movieInfo.module.css'

export const MovieInfoSkeleton = () => {
    return (
        <Box className={styles.container}>
            {/* Скелетон Постера */}
            <Skeleton
                variant="rectangular"
                className={styles.poster}
                sx={{ borderRadius: 2, height: { xs: 450, md: 600 } }}
            />

            {/* Скелетон Информации */}
            <Box className={styles.info} sx={{ width: '100%' }}>
                {/* Заголовок */}
                <Skeleton variant="text" width="60%">
                    <Typography variant="h4">.</Typography>
                </Skeleton>

                {/* Год + рейтинг + продолжительность */}
                <Box className={styles.meta} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Skeleton variant="text" width={100} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width={100} />
                </Box>

                {/* Описание (несколько строк) */}
                <Box sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                </Box>

                {/* Жанры */}
                <Box sx={{ mt: 3 }}>
                    <Skeleton variant="text" width={80} sx={{ mb: 1 }} />
                    <Box className={styles.genres} sx={{ display: 'flex', gap: 1 }}>
                        <Skeleton variant="rounded" width={70} height={24} />
                        <Skeleton variant="rounded" width={70} height={24} />
                        <Skeleton variant="rounded" width={70} height={24} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
