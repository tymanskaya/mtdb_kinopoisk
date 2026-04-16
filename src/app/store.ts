import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { appReducer, appSlice } from "./app-slice.ts"
import {movieCardApi} from "@/features/movieCard/api";
import {favoritesSlice} from "@/features/movieCard/ui/FavoritesPage/favoritesSlice.ts";


export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [movieCardApi.reducerPath]:movieCardApi.reducer,
        [favoritesSlice.name]:favoritesSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieCardApi.middleware),  // ← вот это не хватало
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store