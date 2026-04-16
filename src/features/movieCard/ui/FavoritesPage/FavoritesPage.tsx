import { FavoriteOutlined } from "@mui/icons-material"
import {Container, Grid, Typography} from "@mui/material"
import {useAppSelector} from "@/common/hooks";
import {selectFavorites} from "@/features/movieCard/ui/FavoritesPage/favoritesSlice.ts";
import {MovieCardItem} from "@/common/componets";


export const FavoritesPage = () => {
    const favorites = useAppSelector(selectFavorites)

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Favourite Movies
            </Typography>

            {favorites.length === 0 && (
                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FavoriteOutlined /> No favourite movies yet. Click ♡ on any movie to add it here.
                </Typography>
            )}

            <Grid container spacing={2}>
                {favorites.map(movie => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={movie.id}>
                        <MovieCardItem movie={{
                            id: movie.id,
                            title: movie.title,
                            poster_path: movie.posterUrl,
                            vote_average: movie.voteAverage,
                            backdrop_path: null,
                            overview: '',
                            release_date: '',
                        }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}