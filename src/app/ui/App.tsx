import { Header } from "@/common/componets/Header"
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useAppSelector } from "@/common/hooks"
import { selectThemeMode } from "@/app/app-slice.ts"
import {darkTheme, lightTheme} from "@/common/theme/theme.ts";
import styles from "./App.module.css"
import {Routing} from "@/common/routing";
import {Footer, GlobalSnackbar} from "@/common/componets";

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    return (
        <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
            <div className={styles.app}>
                <CssBaseline />
                <Header />
                <main className={styles.main}>
                    <Routing />
                </main>
                <Footer/>
                <GlobalSnackbar />
            </div>

        </ThemeProvider>
    )
}


