import styles from './Header.module.css'
import logo from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'

import { Path } from "@/common/routing"
import { changeThemeModeAC, selectThemeMode } from "@/app/app-slice.ts"
import { Box, Container, Switch as MuiSwitch } from '@mui/material'
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { NavLink } from 'react-router'

const navItems: { to: string; label: string }[] = [
    { to: Path.Main, label: 'Main' },
    { to: '/category', label: 'Category movies' },
    { to: '/filtered', label: 'Filtered movies' },
    { to: '/search', label: 'Search' },
    { to: '/favorites', label: 'Favorites' },
]

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }

    return (
        <Box
            component="header"
            sx={{
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                width: '100%',
            }}
        >
            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '70px', justifyContent: 'space-between' }}>
                <div className={styles.logo}>
                    <NavLink
                        to={Path.Main}>
                        <img src={logo} alt="TMDB" />
                    </NavLink>

                </div>

                <nav>
                    <ul className={styles.list}>
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    style={({ isActive }) => ({
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        padding: '4px 8px',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#01b4e4' : 'inherit',
                                    })}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <MuiSwitch
                    color="default"
                    checked={themeMode === "dark"}
                    onChange={changeMode}
                    icon={
                        <LightModeIcon sx={{ fontSize: '20px', color: '#ffb74d', backgroundColor: '#fff', borderRadius: '50%', p: '2px' }} />
                    }
                    checkedIcon={
                        <DarkModeIcon sx={{ fontSize: '20px', color: '#fff', backgroundColor: '#001e3c', borderRadius: '50%', p: '2px' }} />
                    }
                />
            </Container>
        </Box>
    )
}

// import logo from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
//
// export const Header=()=>{
//     return(
//         <div>
//             <img src={logo}/>
//         </div>
//     )
// }