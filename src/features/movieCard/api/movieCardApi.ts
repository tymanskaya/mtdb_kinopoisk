
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {MovieDetails} from "@/features/movieCard/api/movieCardApi.types.ts";

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
    }),
})
export const { useFetchCardQuery } = movieCardApi