export type Genre = {
    id: number
    name: string
}

export type ProductionCompany = {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export type Collection = {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
}

// Для списка (popular, search и т.д.)
export type MovieShort = {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    popularity: number
    genre_ids: number[]
    adult: boolean
}

// Для детальной карточки
export type MovieDetails = {
    id: number
    title: string
    original_title: string
    overview: string
    tagline: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    popularity: number
    runtime: number
    budget: number
    revenue: number
    status: string
    homepage: string
    imdb_id: string
    adult: boolean
    genres: Genre[]
    belongs_to_collection: Collection | null
    production_companies: ProductionCompany[]
    origin_country: string[]
    original_language: string
}

// Ответ для списка фильмов
export type MoviesResponse = {
    page: number
    results: MovieShort[]
    total_pages: number
    total_results: number
}

//актеры
export type CastMember = {
    id: number
    name: string
    character: string
    profile_path: string | null
}

export type CreditsResponse = {
    id: number
    cast: CastMember[]
}

export type Movie = {
    id: number
    title: string
    poster_path: string | null  // ← null уже должен быть
    overview: string
    vote_average: number
    release_date: string
    backdrop_path: string | null
}

export type PopularMoviesResponse = {
    page: number
    results: MovieShort[]  // ← вместо Movie[]
    total_pages: number
    total_results: number
}

export type DiscoverParams = {
    sort_by?: string
    'vote_average.gte'?: number
    'vote_average.lte'?: number
    'vote_count.gte'?: number
    with_genres?: string
    page?: number
    include_adult?: boolean
    language?: string
}
