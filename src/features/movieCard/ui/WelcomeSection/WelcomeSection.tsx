
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {Movie} from "@/features/movieCard/api";
import styles from './WelcomeSection.module.css'

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
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const [backdrop] = useState<string | null>(() => getRandomBackdrop(movies))

    const handleSearch = () => {
        if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }

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
                <div className={styles.searchBar}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search for a movie..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={styles.button}
                        onClick={handleSearch}
                        disabled={!query.trim()}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}