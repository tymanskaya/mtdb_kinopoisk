import styles from './Header.module.css'
import logo from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
import {NavLink} from "react-router";
import {Path} from "@/common/routing";
import {changeThemeModeAC, selectThemeMode} from "@/app/app-slice.ts";
import { Switch as MuiSwitch } from '@mui/material';
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const navItems: { to: string; label: string }[] = [
    { to: Path.Main, label: 'Main' },
    { to: '/category', label: 'Category movies' },
    { to: '/filtered', label: 'Filtered movies' },
    { to: '/search', label: 'Search' },
    { to: '/favorites', label: 'Favorites' },
]

export const Header = () => {
    const themeMode=useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }
    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="TMDB" />
            </div>

            <nav>
                <ul className={styles.list}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `${styles.link} ${isActive ? styles.activeLink : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <MuiSwitch
                color="default"
                // Важно: привязываем состояние Switch к вашей теме в Redux
                checked={themeMode === "dark"}
                onChange={changeMode}
                // Иконка для светлой темы (солнце)
                icon={
                    <LightModeIcon
                        sx={{
                            fontSize: '20px',
                            color: '#ffb74d', // Оранжевый цвет солнца
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            p: '2px'
                        }}
                    />
                }
                // Иконка для темной темы (луна)
                checkedIcon={
                    <DarkModeIcon
                        sx={{
                            fontSize: '20px',
                            color: '#fff',
                            backgroundColor: '#001e3c',
                            borderRadius: '50%',
                            p: '2px'
                        }}
                    />
                }
            />
        </header>
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