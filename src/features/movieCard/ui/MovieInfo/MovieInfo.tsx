import type {MovieDetails} from "@/features/movieCard/api";
import { Box, Chip, Typography } from '@mui/material'
import styles from'./movieInfo.module.css'


type Props = {
    movie: MovieDetails
}

export const MovieInfo=({ movie }: Props)=>{
    const year = movie.release_date?.split('-')[0]
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`

    return (
        <Box className={styles.container}>
            {/* Постер */}
            <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            {/* Информация */}
            <Box className={styles.info}>
                    <Typography variant="h4" sx={{ fontWeight: 700}}>
                    {movie.title}
                </Typography>

                {/* Год + рейтинг + продолжительность */}
                <Box className={styles.meta}>
                    <Typography variant="body2" color="text.secondary">
                        Release year: {year}
                    </Typography>

                    <Box className={styles.rating}>
                        {movie.vote_average.toFixed(1)}
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        Runtime: {runtime}
                    </Typography>
                </Box>

                {/* Описание */}
                <Typography variant="body1">
                    {movie.overview}
                </Typography>

                {/* Жанры */}
                <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Genres
                    </Typography>
                    <Box className={styles.genres}>
                        {movie.genres.map(genre => (
                            <Chip key={genre.id} label={genre.name} variant="outlined" size="small" />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}