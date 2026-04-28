import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import {
    Container, Typography, Grid, Box, Button,
    Pagination
} from '@mui/material'
import {
    useFetchPopularMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
    useFetchNowPlayingMoviesQuery,
} from '@/features/movieCard/api/movieCardApi'
import { MovieCardItem } from '@/common/componets'
import {MovieCardItemSkeleton} from "@/common/componets/MovieCardItem";

type CategoryKey = 'popular' | 'top-rated' | 'upcoming' | 'now-playing'

const CATEGORIES: { key: CategoryKey; label: string }[] = [
    { key: 'popular',     label: 'Popular' },
    { key: 'top-rated',   label: 'Top Rated' },
    { key: 'upcoming',    label: 'Upcoming' },
    { key: 'now-playing', label: 'Now Playing' },
]

const TMDB_MAX_PAGES = 500

const useCategoryData = (category: CategoryKey, page: number) => {
    const popular    = useFetchPopularMoviesQuery({ page },    { skip: category !== 'popular' })
    const topRated   = useFetchTopRatedMoviesQuery({ page },   { skip: category !== 'top-rated' })
    const upcoming   = useFetchUpcomingMoviesQuery({ page },   { skip: category !== 'upcoming' })
    const nowPlaying = useFetchNowPlayingMoviesQuery({ page }, { skip: category !== 'now-playing' })

    return { popular, 'top-rated': topRated, upcoming, 'now-playing': nowPlaying }[category]
}

export const CategoryPage = () => {
    const { category } = useParams<{ category?: string }>()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    const activeCategory: CategoryKey =
        CATEGORIES.find(c => c.key === category)?.key ?? 'popular'

    const { data, isLoading, isFetching } = useCategoryData(activeCategory, page)

    const activeLabel = CATEGORIES.find(c => c.key === activeCategory)?.label ?? 'Popular'

    const handleCategoryChange = (key: CategoryKey) => {
        setPage(1)
        navigate(`/category/${key}`)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                {CATEGORIES.map(({ key, label }) => (
                    <Button
                        key={key}
                        variant={activeCategory === key ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange(key)}
                        sx={{ borderRadius: 8, textTransform: 'none', fontWeight: 600, px: 3 }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                {activeLabel} Movies
            </Typography>

            {(isLoading || isFetching) && (
                <Grid container spacing={2}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Grid key={i} size={{ xs: 6, sm: 4, md: 2.4 }}>
                            <MovieCardItemSkeleton />
                        </Grid>
                    ))}
                </Grid>
            )}

            {data && (
                <Box sx={{ opacity: isFetching ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                    <Grid container spacing={2}>
                        {data.results.map(movie => (
                            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                                <MovieCardItem movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {data && data.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={Math.min(data.total_pages, TMDB_MAX_PAGES)}
                        page={page}
                        onChange={(_, val) => {
                            setPage(val)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        color="primary"
                        size="large"
                    />
                </Box>
            )}
        </Container>
    )
}