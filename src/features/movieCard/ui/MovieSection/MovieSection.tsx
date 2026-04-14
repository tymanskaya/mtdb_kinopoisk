import { Box, Typography, Button, Grid } from "@mui/material"
import { useNavigate } from "react-router"
import type { Movie } from "@/features/movieCard/api/movieCardApi.types"
import {MovieCardItem} from "@/common/componets";

type Props = {
    title: string
    movies: Movie[]
    viewMorePath?: string
}

export const MovieSection = ({ title, movies, viewMorePath }: Props) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>{title}</Typography>
                {viewMorePath && (
                    <Button variant="outlined" size="small" onClick={() => navigate(viewMorePath)}>
                        View more
                    </Button>
                )}
            </Box>
            <Grid container spacing={2}>
                {movies.slice(0, 6).map(movie => (
                    <Grid size={{ xs: 6, sm: 4, md: 2 }} key={movie.id}>
                        <MovieCardItem movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}