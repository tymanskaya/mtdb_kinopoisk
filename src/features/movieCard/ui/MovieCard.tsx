
import { useParams, useNavigate } from "react-router"
import { useFetchCardQuery } from "@/features/movieCard/api/movieCardApi.ts"
import { MovieInfo } from "@/features/movieCard/ui/MovieInfo"
import { MovieCast } from "@/features/movieCard/ui/MovieCast"
import { SimilarMovies } from "@/features/movieCard/ui/SimilarMovies"
import { Container, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export const MovieCard = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useFetchCardQuery(
        { movie_id: id! },
        { skip: !id }
    )

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>
    if (!data) return null

    return (
        <Container>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
                sx={{ textTransform: 'none', mt: 2, mb: 1 }}
            >
                Назад
            </Button>

            <MovieInfo movie={data} />
            <MovieCast movieId={data.id.toString()} />
            <SimilarMovies />
        </Container>
    )
}