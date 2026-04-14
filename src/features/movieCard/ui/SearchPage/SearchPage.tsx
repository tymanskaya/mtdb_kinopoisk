import {useSearchParams} from "react-router";
import {useSearchMoviesQuery} from "@/features/movieCard/api/movieCardApi.ts";
import {Box, Container, Grid, Typography} from "@mui/material";
import {MovieCardItem} from "@/common/componets";

export const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') ?? ''
    const { data, isLoading, isError } = useSearchMoviesQuery({ query }, { skip: !query })

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
                Search results for: <em>"{query}"</em>
            </Typography>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading results</div>}
            {!isLoading && data?.results.length === 0 && (
                <Typography color="text.secondary">No movies found 😔</Typography>
            )}

            <Grid container spacing={2}>
                {data?.results.map(movie => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={movie.id}>
                        <MovieCardItem movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {data && (
                <Box sx={{ mt: 3, color: 'text.secondary' }}>
                    <Typography variant="body2">
                        Found {data.total_results} results
                    </Typography>
                </Box>
            )}
        </Container>
    )
}