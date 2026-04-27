
import {createSlice} from "@reduxjs/toolkit"


const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: (savedTheme ?? 'light') as ThemeMode,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
            localStorage.setItem('themeMode', action.payload.themeMode)
        }),

    }),

})

export const { selectThemeMode} = appSlice.selectors
export const { changeThemeModeAC} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"