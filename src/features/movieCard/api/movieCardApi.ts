
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreditsResponse,
    MovieDetails,
    PopularMoviesResponse
} from "@/features/movieCard/api/movieCardApi.types.ts";

export const movieCardApi = createApi({

    reducerPath: 'cardApi',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_KEY}`)
            return headers
        },
    }),
    endpoints: build => ({
        fetchCard: build.query<MovieDetails, {movie_id: string}>({
            query: ({movie_id}) => {
                return {
                    method: 'get',
                    url: `movie/${movie_id}`,
                }
            },
        }),
        fetchMovieCredits: build.query<CreditsResponse, { movie_id: string }>({
            query: ({ movie_id }) => ({ url: `movie/${movie_id}/credits` }),
        }),
        fetchPopularMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/popular`, params: { page } }),
        }),
        fetchSimilarMovies: build.query<PopularMoviesResponse, { movie_id: string }>({
            query: ({ movie_id }) => ({ url: `movie/${movie_id}/similar` }),
        }),

    }),
})
export const { useFetchCardQuery, useFetchMovieCreditsQuery, useFetchPopularMoviesQuery, useFetchSimilarMoviesQuery } = movieCardApi