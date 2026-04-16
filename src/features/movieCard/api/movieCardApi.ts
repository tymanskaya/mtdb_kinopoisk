
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreditsResponse, DiscoverParams, Genre,
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
        fetchTopRatedMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/top_rated`, params: { page } }),
        }),
        fetchUpcomingMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/upcoming`, params: { page } }),
        }),
        fetchNowPlayingMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/now_playing`, params: { page } }),
        }),
        searchMovies: build.query<PopularMoviesResponse, { query: string; page?: number }>({
            query: ({ query, page = 1 }) => ({
                url: `search/movie`,
                params: { query, page, include_adult: false, language: 'en-US' }
            }),
        }),
        fetchDiscoverMovies: build.query<PopularMoviesResponse, DiscoverParams>({
            query: (params) => ({
                url: 'discover/movie',
                params: {
                    include_adult: false,
                    language: 'en-US',
                    ...params,
                }
            }),
        }),
        fetchGenres: build.query<{ genres: Genre[] }, void>({
            query: () => ({ url: 'genre/movie/list', params: { language: 'en-US' } }),
        }),

    }),
})
export const {
    useFetchCardQuery,
    useFetchMovieCreditsQuery,
    useFetchPopularMoviesQuery,
    useFetchSimilarMoviesQuery,
    useSearchMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
    useFetchNowPlayingMoviesQuery,
useFetchDiscoverMoviesQuery,
useFetchGenresQuery} = movieCardApi