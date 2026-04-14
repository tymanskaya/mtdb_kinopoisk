import { Box, Typography } from '@mui/material'
import styles from './MovieCast.module.css'
import { useMovieCredits } from "@/common/hooks"

type Props = { movieId: string }

export const MovieCast = ({ movieId }: Props) => {
    const { cast, isLoading } = useMovieCredits(movieId)

    if (isLoading) return null

    return (
        <Box className={styles.container}>
            <Typography variant="h6" fontWeight={700} mb={2}>
                Cast
            </Typography>

            <Box className={styles.list}>
                {cast.map(actor => (
                    <Box key={actor.id} className={styles.actor}>
                        <img
                            src={actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : `https://placehold.co/150x150?text=No+Photo`}
                            alt={actor.name}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                        <p className={styles.name}>{actor.name}</p>
                        <p className={styles.character}>{actor.character || 'Unknown role'}</p>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}