
import {useFetchPopularMoviesQuery} from "@/features/movieCard/api/movieCardApi.ts";
import {useNavigate} from "react-router";
import {Box, Button,Container, Grid, Typography} from "@mui/material";
import {MovieCardItem} from "@/common/componets";


export const MainPage = () => {
    const { data, isLoading, isError } = useFetchPopularMoviesQuery({ page: 1 });
    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (isError) return <div>Ошибка загрузки</div>;

    return (
        <Container sx={{ py: 4 }}>
            {/* Заголовок по заданию */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Popular Movies
            </Typography>

            <Grid container spacing={3}>
                {/* Ограничиваем до 6 карточек через .slice(0, 6) */}
                {data?.results.slice(0, 6).map(movie => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
                        <MovieCardItem movie={movie}/>
                    </Grid>
                ))}
            </Grid>

            {/* Кнопка View More для перехода к Category Movies */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/movies/popular')} // Путь к полной категории
                    sx={{ textTransform: 'none', px: 4 }}
                >
                    View More
                </Button>
            </Box>
        </Container>
    );
};

