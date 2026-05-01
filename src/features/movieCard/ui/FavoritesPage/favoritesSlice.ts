import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {STORAGE_KEY} from "@/common/constants";


export type FavoriteMovie = {
    id: number
    title: string
    posterUrl: string|null
    voteAverage: number
}

type FavoritesState = { items: FavoriteMovie[] }



const load = (): FavoriteMovie[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY.favorites) ?? '[]') }
    catch { return [] }
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: { items: load() } as FavoritesState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
            const exists = state.items.some(m => m.id === action.payload.id)
            state.items = exists
                ? state.items.filter(m => m.id !== action.payload.id)
                : [...state.items, action.payload]
            localStorage.setItem(STORAGE_KEY.favorites, JSON.stringify(state.items))
        },
    },
})

export const { toggleFavorite } = favoritesSlice.actions
export const selectFavorites = (state: { favorites: { items: FavoriteMovie[] } }) => state.favorites.items
export const selectIsFavorite = (id: number) => (state: { favorites: { items: FavoriteMovie[] } }) =>
    state.favorites.items.some(m => m.id === id)