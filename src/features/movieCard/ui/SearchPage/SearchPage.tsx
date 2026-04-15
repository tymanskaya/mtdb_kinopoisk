import { useSearchParams } from "react-router"
import { useSearchMoviesQuery } from "@/features/movieCard/api/movieCardApi.ts"
import { Container, Grid, Typography } from "@mui/material"
import { MovieCardItem, SearchBar } from "@/common/componets"
import { SearchOutlined } from "@mui/icons-material"

export const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') ?? ''

    const { data, isLoading, isError } = useSearchMoviesQuery(
        { query },
        { skip: !query }
    )

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Search results {query && <>for: <em>"{query}"</em></>}
            </Typography>

            <SearchBar defaultValue={query} />

            {!query &&
                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <SearchOutlined /> Enter a movie title to start searching
                </Typography>
            }

            {isLoading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
            {isError && <Typography color="error" sx={{ mt: 2 }}>Error loading results</Typography>}

            {query && !isLoading && data?.results.length === 0 &&
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                    No matches found for "{query}" 😔
                </Typography>
            }

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {data?.results.map(movie => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={movie.id}>
                        <MovieCardItem movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {query && data && data.total_results > 0 &&
                <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    Found {data.total_results} results
                </Typography>
            }
        </Container>
    )
}