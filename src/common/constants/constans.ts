export const STORAGE_KEY = {
    favorites: 'favorites',
} as const

export const Path = {
    Main: '/',
    Movie: '/movie/:id',
    Search: '/search',
    Favorites: '/favorites',
    Filtered: '/filtered',
    Category: '/category/:category',
} as const