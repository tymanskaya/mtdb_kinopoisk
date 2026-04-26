
import type {
    CreditsResponse, DiscoverParams, Genre,
    MovieDetails,
    PopularMoviesResponse
} from "@/features/movieCard/api/movieCardApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

import {
    CreditsResponseSchema, GenresResponseSchema,
    MovieDetailsSchema, PopularMoviesResponseSchema
} from "@/features/movieCard/model/movieCardApi.schemas.ts";
import {withZodTransform} from "@/common/util";

export const movieCardApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchCard: build.query<MovieDetails, { movie_id: string }>({
            query: ({ movie_id }) => ({ method: 'get', url: `movie/${movie_id}` }),
            transformResponse: withZodTransform(MovieDetailsSchema, 'fetchCard'),
        }),
        fetchMovieCredits: build.query<CreditsResponse, { movie_id: string }>({
            query: ({ movie_id }) => ({ url: `movie/${movie_id}/credits` }),
            transformResponse: withZodTransform(CreditsResponseSchema, 'fetchMovieCredits'),
        }),
        fetchPopularMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/popular`, params: { page } }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchPopularMovies'),
        }),
        fetchSimilarMovies: build.query<PopularMoviesResponse, { movie_id: string }>({
            query: ({ movie_id }) => ({ url: `movie/${movie_id}/similar` }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchSimilarMovies'),
        }),
        fetchTopRatedMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/top_rated`, params: { page } }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchTopRatedMovies'),
        }),
        fetchUpcomingMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/upcoming`, params: { page } }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchUpcomingMovies'),
        }),
        fetchNowPlayingMovies: build.query<PopularMoviesResponse, { page?: number }>({
            query: ({ page = 1 }) => ({ url: `movie/now_playing`, params: { page } }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchNowPlayingMovies'),
        }),
        searchMovies: build.query<PopularMoviesResponse, { query: string; page?: number }>({
            query: ({ query, page = 1 }) => ({
                url: `search/movie`,
                params: { query, page, include_adult: false, language: 'en-US' },
            }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'searchMovies'),
        }),
        fetchDiscoverMovies: build.query<PopularMoviesResponse, DiscoverParams>({
            query: (params) => ({
                url: 'discover/movie',
                params: { include_adult: false, language: 'en-US', ...params },
            }),
            transformResponse: withZodTransform(PopularMoviesResponseSchema, 'fetchDiscoverMovies'),
        }),
        fetchGenres: build.query<{ genres: Genre[] }, void>({
            query: () => ({ url: 'genre/movie/list', params: { language: 'en-US' } }),
            transformResponse: withZodTransform(GenresResponseSchema, 'fetchGenres'),
        }),

    }),
})

export const {
    useFetchCardQuery,
    useFetchMovieCreditsQuery,
    useFetchPopularMoviesQuery,
    useFetchSimilarMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery,
    useFetchNowPlayingMoviesQuery,
    useSearchMoviesQuery,
    useFetchDiscoverMoviesQuery,
    useFetchGenresQuery,
} = movieCardApi