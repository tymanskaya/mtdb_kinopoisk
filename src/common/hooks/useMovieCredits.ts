
import {useFetchMovieCreditsQuery} from "@/features/movieCard/api/movieCardApi.ts";

export const useMovieCredits = (movie_id: string) => {
    const { data, isLoading, isError } = useFetchMovieCreditsQuery({ movie_id })

    return {
        cast: data?.cast.slice(0, 6) ?? [],
        isLoading,
        isError,
    }
}