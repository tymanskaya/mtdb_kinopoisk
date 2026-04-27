
import {
    useFetchNowPlayingMoviesQuery,
    useFetchPopularMoviesQuery,
    useFetchTopRatedMoviesQuery,
    useFetchUpcomingMoviesQuery
} from "@/features/movieCard/api/movieCardApi.ts";
import {Container} from "@mui/material";
import {MovieSection} from "@/features/movieCard/ui/MovieSection/MovieSection.tsx";
import {WelcomeSection} from "@/features/movieCard/ui/WelcomeSection/WelcomeSection.tsx";
import {MainPageSkeleton} from "@/app/ui/MainPageSkeleton.tsx";


export const MainPage = () => {
    const { data: popular, isLoading } = useFetchPopularMoviesQuery({ page: 1 })
    const { data: topRated } = useFetchTopRatedMoviesQuery({ page: 1 })
    const { data: upcoming } = useFetchUpcomingMoviesQuery({ page: 1 })
    const { data: nowPlaying } = useFetchNowPlayingMoviesQuery({ page: 1 })

    if(isLoading){
        return <MainPageSkeleton />
    }

    return (
        <>
            <WelcomeSection movies={popular?.results ?? []} />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <MovieSection title="Popular Movies" movies={popular?.results ?? []} viewMorePath="/category/popular" />
                <MovieSection title="Top Rated Movies" movies={topRated?.results ?? []} viewMorePath="/category/top-rated" />
                <MovieSection title="Upcoming Movies" movies={upcoming?.results ?? []} viewMorePath="/category/upcoming" />
                <MovieSection title="Now Playing" movies={nowPlaying?.results ?? []} viewMorePath="/category/now-playing" />
            </Container>
        </>
    )
}

