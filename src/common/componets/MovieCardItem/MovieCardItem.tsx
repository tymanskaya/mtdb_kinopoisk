import {useNavigate} from "react-router";
import type {Movie} from "@/features/movieCard/api";
import {Path} from "@/common/routing";
import styles from './MovieCardItem.module.css'
import { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

type Props = {
    movie: Movie
}

export const MovieCardItem = ({ movie }: Props) => {
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(false)

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
                        setIsFavorite(prev => !prev)
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