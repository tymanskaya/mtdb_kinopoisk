import {Route, Routes} from "react-router";
import {MainPage} from "@/app/ui/MainPage.tsx";
import {MovieCard} from "@/features/movieCard/ui/MovieCard.tsx";
import {SearchPage} from "@/features/movieCard/ui/SearchPage/SearchPage.tsx";

export const Path = {
    Main: '/',
    Movie: '/movie/:id',
    Search: '/search',
    // Tracks: '/tracks',
    // Profile: '/profile',
    // OAuthRedirect: '/oauth/callback',
    // NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage />} />
        <Route path={Path.Movie} element={<MovieCard />} />
        <Route path={Path.Search} element={<SearchPage />} />
        {/*<Route path={Path.Tracks} element={<TracksPage />} />*/}
        {/*<Route path={Path.Profile} element={<ProfilePage />} />*/}
        {/*<Route path={Path.OAuthRedirect} element={<OAuthCallback />} />*/}
        {/*<Route path={Path.NotFound} element={<PageNotFound />} />*/}
    </Routes>
)