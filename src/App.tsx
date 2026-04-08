import { Header } from "@/common/componets/Header"
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useAppSelector } from "@/common/hooks"
import { selectThemeMode } from "@/app/app-slice"
import {darkTheme, lightTheme} from "@/common/theme/theme.ts";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <Header />
        </ThemeProvider>
    )
}


