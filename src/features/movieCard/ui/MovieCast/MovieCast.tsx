import { Avatar, Box, Typography } from '@mui/material'
import styles from './MovieCast.module.css'
import {useMovieCredits} from "@/common/hooks";

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
                        <Avatar
                            src={actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : `https://placehold.co/80x80?text=No+Photo`}
                            alt={actor.name}
                            className={styles.avatar}
                        />
                        <Typography variant="body2" fontWeight={600} align="center">
                            {actor.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" align="center">
                            {actor.character || 'Unknown role'}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}