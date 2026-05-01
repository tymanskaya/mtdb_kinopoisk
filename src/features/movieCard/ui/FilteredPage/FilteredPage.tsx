import { useState } from 'react'
import {
    Container,Pagination, Grid, Box} from '@mui/material'
import { useFetchDiscoverMoviesQuery } from '@/features/movieCard/api/movieCardApi'
import styles from './filteredPage.module.css'
import {MovieCardItem} from "@/common/componets";
import {MovieCardItemSkeleton} from "@/common/componets/MovieCardItem";
import {Sidebar} from "@/features/movieCard/ui/FilteredPage/Sidebar/Sidebar.tsx";


type Filters = {
    sortBy: string
    debouncedRating: [number, number]
    selectedGenres: number[]
}

export const FilteredPage = () => {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<Filters>({
        sortBy: 'popularity.desc',
        debouncedRating: [0, 10],
        selectedGenres: [],
    })

    const { data, isLoading, isFetching } = useFetchDiscoverMoviesQuery({
        sort_by: filters.sortBy,
        'vote_average.gte': filters.debouncedRating[0],
        'vote_average.lte': filters.debouncedRating[1],
        'vote_count.gte': filters.sortBy.startsWith('vote_average') ? 100 : undefined,
        with_genres: filters.selectedGenres.length ? filters.selectedGenres.join(',') : undefined,
        page,
    })
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <div className={styles.layout}>
                <Sidebar
                    setPage={setPage}
                    onFiltersChange={setFilters}
                />
                <div className={styles.results}>
                    {/* Скелетон при загрузке */}
                    {(isLoading || isFetching) && (
                        <Grid container spacing={2}>
                            {Array.from({ length: 20 }).map((_, i) => (
                                <Grid key={i} size={{ xs: 6, sm: 4, md: 2.4 }}>
                                    <MovieCardItemSkeleton />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Карточки только когда не грузится */}
                    {!isLoading && !isFetching && (
                        <Grid container spacing={2}>
                            {data?.results.map(movie => (
                                <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={movie.id}>
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