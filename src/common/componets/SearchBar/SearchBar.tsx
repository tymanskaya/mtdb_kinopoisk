
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from './SearchBar.module.css'

export const SearchBar=()=>{
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const handleSearch = () => {
        if (query.trim()) navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }
    return (
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
    )
}