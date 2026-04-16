import { useState } from 'react'
import {
    Container, Typography, Select, MenuItem,
    Slider, Pagination, CircularProgress, Grid, Box, Button, Chip
} from '@mui/material'
import { useFetchGenresQuery, useFetchDiscoverMoviesQuery } from '@/features/movieCard/api/movieCardApi'

import styles from './FilteredPage.module.css'
import {MovieCardItem} from "@/common/componets";
import {useDebounce} from "@/common/hooks";

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'primary_release_date.desc', label: 'Release Date ↓' },
    { value: 'primary_release_date.asc', label: 'Release Date ↑' },
    { value: 'title.asc', label: 'Title A–Z' },
    { value: 'title.desc', label: 'Title Z–A' },
    { value: 'revenue.desc', label: 'Revenue ↓' },
    { value: 'vote_count.desc', label: 'Most Voted' },
]

const DEFAULT_SORT = 'popularity.desc'
const DEFAULT_RATING: [number, number] = [0, 10]

export const FilteredPage = () => {
    const [sortBy, setSortBy] = useState(DEFAULT_SORT)
    const [rating, setRating] = useState<[number, number]>(DEFAULT_RATING)
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])
    const [page, setPage] = useState(1)

    const debouncedRating = useDebounce(rating, 200)

    const { data: genresData } = useFetchGenresQuery()

    const { data, isLoading, isFetching } = useFetchDiscoverMoviesQuery({
        sort_by: sortBy,
        'vote_average.gte': debouncedRating[0],
        'vote_average.lte': debouncedRating[1],
        'vote_count.gte': sortBy.startsWith('vote_average') ? 100 : undefined,
        with_genres: selectedGenres.length ? selectedGenres.join(',') : undefined,
        page,
    })

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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Filtered Movies</Typography>
            <div className={styles.layout}>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Sort by</Typography>
                    <Select
                        fullWidth
                        size="small"
                        value={sortBy}
                        onChange={e => { setSortBy(e.target.value); setPage(1) }}
                        sx={{ mb: 3 }}
                    >
                        {SORT_OPTIONS.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </Select>

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>>
                        Rating: {debouncedRating[0].toFixed(1)} – {debouncedRating[1].toFixed(1)}
                    </Typography>
                    <Slider
                        value={rating}
                        onChange={(_, val) => { setRating(val as [number, number]); setPage(1) }}
                        min={0} max={10} step={0.1}
                        valueLabelDisplay="auto"
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>>Genres</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {genresData?.genres.map(genre => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                onClick={() => toggleGenre(genre.id)}
                                color={selectedGenres.includes(genre.id) ? 'primary' : 'default'}
                                variant={selectedGenres.includes(genre.id) ? 'filled' : 'outlined'}
                                size="small"
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                    </Box>

                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={handleReset}
                    >
                        Reset filters
                    </Button>
                </aside>

                {/* Results */}
                <div className={styles.results}>
                    {(isLoading || isFetching) && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {!isLoading && !isFetching && data?.results.length === 0 && (
                        <Typography color="text.secondary">No movies found for selected filters 😔</Typography>
                    )}

                    {!isLoading && (
                        <Grid container spacing={2}>
                            {data?.results.map(movie => (
                                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={movie.id}>
                                    <MovieCardItem movie={movie} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {data && data.total_pages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={Math.min(data.total_pages, 500)}
                                page={page}
                                onChange={(_, val) => { setPage(val); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                                color="primary"
                            />
                        </Box>
                    )}
                </div>
            </div>
        </Container>
    )
}