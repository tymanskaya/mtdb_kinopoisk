
import {useFetchPopularMoviesQuery} from "@/features/movieCard/api/movieCardApi.ts";
import {useNavigate} from "react-router";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {Path} from "@/common/routing";


export const MainPage = () => {
    const { data, isLoading, isError } = useFetchPopularMoviesQuery({ page: 1 })
    const navigate = useNavigate()

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {data?.results.map(movie => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                        <Card
                            sx={{ cursor: 'pointer', height: '100%' }}
                            onClick={() => navigate(Path.Movie.replace(':id', movie.id.toString()))}
                        >
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6" noWrap>{movie.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

