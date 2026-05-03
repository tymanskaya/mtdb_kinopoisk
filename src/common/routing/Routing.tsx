import {Route, Routes} from "react-router";
import {MainPage} from "@/app/ui/MainPage.tsx";
import {MovieCard} from "@/features/movieCard/ui/MovieCard.tsx";
import {SearchPage} from "@/features/movieCard/ui/SearchPage/SearchPage.tsx";
import {FavoritesPage} from "@/features/movieCard/ui/FavoritesPage/FavoritesPage.tsx";
import {FilteredPage} from "@/features/movieCard/ui/FilteredPage";
import {CategoryPage} from "@/features/movieCard/ui/CategoryPage";
import {NotFoundPage} from "@/common/componets";
import {Path} from "@/common/constants";



export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage />} />
        <Route path={Path.Movie} element={<MovieCard />} />
        <Route path={Path.Search} element={<SearchPage />} />
        <Route path={Path.Favorites} element={<FavoritesPage />} />
        <Route path={Path.Filtered} element={<FilteredPage />} />
        <Route path={Path.Category} element={<CategoryPage />} />
        <Route path="/category/:category?" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* ← последним */}
    </Routes>
)