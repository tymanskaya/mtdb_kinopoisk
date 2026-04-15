import {useState} from "react";
import type {Movie} from "@/features/movieCard/api";
import styles from './WelcomeSection.module.css'
import {SearchBar} from "@/common/componets";

type Props = {
    movies: Movie[]
}

function getRandomBackdrop(movies: Movie[]): string | null {
    const withBackdrop = movies.filter(m => m.backdrop_path)
    if (!withBackdrop.length) return null
    const random = withBackdrop[Math.floor(Math.random() * withBackdrop.length)]
    return random?.backdrop_path ?? null
}

export const WelcomeSection = ({ movies }: Props) => {

    const [backdrop] = useState<string | null>(() => getRandomBackdrop(movies))


    return (
        <div
            className={styles.hero}
            style={{
                backgroundImage: backdrop
                    ? `url(https://image.tmdb.org/t/p/original${backdrop})`
                    : undefined,
            }}
        >
            <div className={styles.overlay} />
            <div className={styles.content}>
                <h1 className={styles.title}>Millions of movies to discover</h1>
                <p className={styles.subtitle}>Explore now. Find your next favourite.</p>
                <SearchBar/>
            </div>
        </div>
    )
}