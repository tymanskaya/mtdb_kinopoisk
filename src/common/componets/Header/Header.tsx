import styles from './Header.module.css'
import logo from '../../../assets/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
import {NavLink} from "react-router";
import {Path} from "@/common/routing";

const navItems: { to: string; label: string }[] = [
    { to: Path.Main, label: 'Main' },
    { to: '/category', label: 'Category movies' },
    { to: '/filtered', label: 'Filtered movies' },
    { to: '/search', label: 'Search' },
    { to: '/favorites', label: 'Favorites' },
]

export const Header = () => {
    return (
        <header className={styles.header}>
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

            <button className={styles.themeBtn}>🌙</button>
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