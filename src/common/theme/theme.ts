import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#01b4e4' },
        secondary: { main: '#90cea1' },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#01b4e4' },
        secondary: { main: '#90cea1' },
        background: {
            default: '#0d253f',
            paper: '#1a3a5c',
        },
    },
})

