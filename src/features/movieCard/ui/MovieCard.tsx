import { useFetchCardQuery } from "@/features/movieCard/api/movieCardApi.ts"

export const MovieCard = () => {
    const { data, isLoading, isError } = useFetchCardQuery({ movie_id: '12' }) // Star Wars

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка загрузки</div>
    if (!data) return null

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.overview}</p>
            <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
            />
        </div>
    )
}