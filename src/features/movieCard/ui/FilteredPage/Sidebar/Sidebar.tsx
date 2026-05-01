
import {Box, Button, Chip, MenuItem, Select, Slider, Typography} from "@mui/material";
import styles from './sidebar.module.css'
import {useFetchGenresQuery} from "@/features/movieCard/api/movieCardApi.ts";
import {useEffect, useState} from "react";
import {useDebounce} from "@/common/hooks";
import {SidebarSkeleton} from "@/features/movieCard/ui/FilteredPage/Sidebar/SidebarSkeleton.tsx";

type Props = {
    setPage: (page: number) => void
    onFiltersChange: (filters: {
        sortBy: string
        debouncedRating: [number, number]
        selectedGenres: number[]
    }) => void
}

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'primary_release_date.desc', label: 'Release Date ↓' },
    { value: 'primary_release_date.asc', label: 'Release Date ↑' },
    { value: 'title.asc', label: 'Title A–Z' },
    { value: 'title.desc', label: 'Title Z–A' },
]

const DEFAULT_SORT = 'popularity.desc'
const DEFAULT_RATING: [number, number] = [0, 10]

export const Sidebar=({setPage, onFiltersChange}:Props)=>{
    const [sortBy, setSortBy] = useState(DEFAULT_SORT)
    const [rating, setRating] = useState<[number, number]>(DEFAULT_RATING)
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])


    const { data: genresData, isLoading } = useFetchGenresQuery()

    const debouncedRating = useDebounce(rating, 200)

    const toggleGenre = (id: number) => {
        setPage(1)
        setSelectedGenres(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        )
    }

    const handleReset = () => {
        setSortBy(DEFAULT_SORT)
        setRating(DEFAULT_RATING)
        setSelectedGenres([])
        setPage(1)
    }
    useEffect(() => {
        onFiltersChange({ sortBy, debouncedRating, selectedGenres })
    }, [sortBy, debouncedRating, selectedGenres])


    if (isLoading) return (
        <aside className={styles.sidebar}>
            <SidebarSkeleton />
        </aside>
    )

    return(
        <aside className={styles.sidebar}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Filters / Sort
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Sort by</Typography>
            <Select
                fullWidth size="small" value={sortBy}
                onChange={e => { setSortBy(e.target.value); setPage(1) }}
                sx={{ mb: 3 }}
            >
                {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
            </Select>

            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Rating {debouncedRating[0].toFixed(1)} - {debouncedRating[1].toFixed(1)}
            </Typography>
            <Slider
                value={rating}
                onChange={(_, val) => { setRating(val as [number, number]); setPage(1) }}
                min={0} max={10} step={0.1}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
                {genresData?.genres.map(genre => (
                    <Chip
                        key={genre.id} label={genre.name}
                        onClick={() => toggleGenre(genre.id)}
                        color={selectedGenres.includes(genre.id) ? 'primary' : 'default'}
                        variant={selectedGenres.includes(genre.id) ? 'filled' : 'outlined'}
                        size="small" sx={{ cursor: 'pointer' }}
                    />
                ))}
            </Box>

            <Button variant="contained" color="primary" fullWidth onClick={handleReset}>
                Reset filters
            </Button>
        </aside>
    )
}