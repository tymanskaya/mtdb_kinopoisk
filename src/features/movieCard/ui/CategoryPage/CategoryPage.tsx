
import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import {
    Container, Typography, Grid, Box, Button,
    Pagination, Skeleton
} from '@mui/material'
import {
    useFetchPopularMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
    useFetchNowPlayingMoviesQuery,
} from '@/features/movieCard/api/movieCardApi'
import { MovieCardItem } from '@/common/componets'
import { MovieCardItemSkeleton } from "@/common/componets/MovieCardItem";

type CategoryKey = 'popular' | 'top-rated' | 'upcoming' | 'now-playing'

const CATEGORIES: { key: CategoryKey; label: string; width: number }[] = [
    { key: 'popular',     label: 'Popular',     width: 90 },
    { key: 'top-rated',   label: 'Top Rated',   width: 110 },
    { key: 'upcoming',    label: 'Upcoming',    width: 100 },
    { key: 'now-playing', label: 'Now Playing', width: 120 },
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

    // isLoading — только первая загрузка, isFetching — любая смена страницы/категории
    const { data, isLoading, isFetching } = useCategoryData(activeCategory, page)

    const activeLabel = CATEGORIES.find(c => c.key === activeCategory)?.label ?? 'Popular'

    const handleCategoryChange = (key: CategoryKey) => {
        setPage(1)
        navigate(`/category/${key}`)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Скелетоны для кнопок (показываем только при самой первой загрузке страницы) */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                {isLoading
                    ? CATEGORIES.map((cat) => (
                        <Skeleton
                            key={cat.key}
                            variant="rounded"
                            width={cat.width}
                            height={36.5}
                            sx={{ borderRadius: 8 }}
                        />
                    ))
                    : CATEGORIES.map(({ key, label }) => (
                        <Button
                            key={key}
                            variant={activeCategory === key ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange(key)}
                            sx={{ borderRadius: 8, textTransform: 'none', fontWeight: 600, px: 3 }}
                        >
                            {label}
                        </Button>
                    ))
                }
            </Box>

            {isFetching ? (
                <Skeleton variant="text" width={220} height={40} sx={{ mb: 3 }} animation="wave" />
            ) : (
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    {activeLabel} Movies
                </Typography>
            )}

            {/* Скелетоны карточек — показываем ВСЕГДА, когда идет запрос (isFetching) */}
            {isFetching ? (
                <Grid container spacing={2}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Grid key={i} size={{ xs: 6, sm: 4, md: 2.4 }}>
                            <MovieCardItemSkeleton />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                /* Контент — показываем только когда загрузка завершена */
                data && (
                    <Grid container spacing={2}>
                        {data.results.map(movie => (
                            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
                                <MovieCardItem movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                )
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
                        disabled={isFetching} // Отключаем пагинацию во время загрузки
                    />
                </Box>
            )}
        </Container>
    )
}