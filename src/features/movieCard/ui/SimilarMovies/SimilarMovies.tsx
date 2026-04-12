import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useFetchSimilarMoviesQuery } from '@/features/movieCard/api/movieCardApi';
import {Path} from "@/common/routing"; // проверьте путь


export const SimilarMovies = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Вызываем созданный нами ранее эндпоинт
    const { data, isLoading, isError } = useFetchSimilarMoviesQuery({ movie_id: id || '' });

    if (isLoading) return <Typography sx={{ mt: 2 }}>Загрузка похожих фильмов...</Typography>;
    if (isError || !data?.results.length) return null;

    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Similar Movies
            </Typography>

            <Grid container spacing={2}>
                {data?.results.slice(0, 6).map((movie) => (
                    <Grid item xs={12} sm={4} md={3} lg={2} key={movie.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={movie.poster_path ? `https://tmdb.org{movie.poster_path}` : 'https://placeholder.com'}
                                alt={movie.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', height: '3em', overflow: 'hidden' }}>
                                    {movie.title}
                                </Typography>
                                <Typography variant="caption">⭐ {movie.vote_average.toFixed(1)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
