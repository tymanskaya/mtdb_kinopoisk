import { useParams} from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import { useFetchSimilarMoviesQuery } from '@/features/movieCard/api/movieCardApi';
import {MovieCardItem} from "@/common/componets"; // проверьте путь


export const SimilarMovies = () => {
    const { id } = useParams<{ id: string }>();

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
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={movie.id}>
                        <MovieCardItem movie={movie}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
