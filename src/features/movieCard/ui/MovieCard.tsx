import { useParams } from 'react-router-dom'
import { useFetchCardQuery } from "@/features/movieCard/api/movieCardApi.ts"
import { MovieInfo } from "@/features/movieCard/ui/MovieInfo"
import { MovieCast } from "@/features/movieCard/ui/MovieCast"
import { Container } from "@mui/material"
import {SimilarMovies} from "@/features/movieCard/ui/SimilarMovies";

export const MovieCard = () => {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, isError } = useFetchCardQuery(
        { movie_id: id! },
        { skip: !id }
    )


    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>
    if (!data) return null

    return (
        <Container>
            <MovieInfo movie={data} />
            <MovieCast movieId={data.id.toString()} />
            <SimilarMovies/>
        </Container>
    )
}