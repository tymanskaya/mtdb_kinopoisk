import { createTheme } from '@mui/material/styles'

const disableScrollLock = {
    components: {
        MuiPopover: { defaultProps: { disableScrollLock: true } },
        MuiMenu:    { defaultProps: { disableScrollLock: true } },
        MuiModal:   { defaultProps: { disableScrollLock: true } },
        MuiSelect: {
            defaultProps: {
                MenuProps: {
                    disablePortal: true,      // ← рендер внутри DOM, не в body
                    disableScrollLock: true,
                }
            }
        },
    }
}

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
    ...disableScrollLock,
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
    ...disableScrollLock,
})

