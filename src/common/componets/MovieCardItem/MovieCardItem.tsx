import { useNavigate } from "react-router"
import type { Movie } from "@/features/movieCard/api"
import styles from './MovieCardItem.module.css'
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { toggleFavorite, selectIsFavorite } from "@/features/movieCard/ui/FavoritesPage/favoritesSlice"
import {Path} from "@/common/constants";

type Props = { movie: Movie }

export const MovieCardItem = ({ movie }: Props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector(selectIsFavorite(movie.id))

    return (
        <div
            className={styles.card}
            onClick={() => navigate(Path.Movie.replace(':id', movie.id.toString()))}
        >
            <div className={styles.posterWrapper}>
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className={styles.rating}>
                    {movie.vote_average.toFixed(1)}
                </div>

                <button
                    className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(toggleFavorite({
                            id: movie.id,
                            title: movie.title,
                            posterUrl: movie.poster_path,
                            voteAverage: movie.vote_average,
                        }))
                    }}
                >
                    {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                </button>
            </div>

            <div className={styles.content}>
                <p className={styles.title}>{movie.title}</p>
            </div>
        </div>
    )
}