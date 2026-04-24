import { z } from 'zod'

// ─── Общие ───────────────────────────────────────────────────────────────────

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const ProductionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string(),
})

export const CollectionSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
})

// ─── Список фильмов ───────────────────────────────────────────────────────────

export const MovieShortSchema = z.object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
    genre_ids: z.array(z.number()),
    adult: z.boolean(),
})

export const MoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieShortSchema),
    total_pages: z.number(),
    total_results: z.number(),
})

// ─── Детальная карточка ───────────────────────────────────────────────────────

export const MovieDetailsSchema = z.object({
    id: z.number(),
    title: z.string(),
    original_title: z.string(),
    overview: z.string(),
    tagline: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
    runtime: z.number(),
    budget: z.number(),
    revenue: z.number(),
    status: z.string(),
    homepage: z.string(),
    imdb_id: z.string(),
    adult: z.boolean(),
    genres: z.array(GenreSchema),
    belongs_to_collection: CollectionSchema.nullable(),
    production_companies: z.array(ProductionCompanySchema),
    origin_country: z.array(z.string()),
    original_language: z.string(),
})

// ─── Актёры ───────────────────────────────────────────────────────────────────

export const CastMemberSchema = z.object({
    id: z.number(),
    name: z.string(),
    character: z.string(),
    profile_path: z.string().nullable(),
})

export const CreditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(CastMemberSchema),
})

// ─── Жанры ───────────────────────────────────────────────────────────────────

export const GenresResponseSchema = z.object({
    genres: z.array(GenreSchema),
})