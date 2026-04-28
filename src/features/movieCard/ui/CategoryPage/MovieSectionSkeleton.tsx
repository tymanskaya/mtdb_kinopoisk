
import { Box, Grid, Skeleton } from '@mui/material'
import {MovieCardItemSkeleton} from "@/common/componets/MovieCardItem";



export const MovieSectionSkeleton = () => (
    <Box sx={{ mb: 4 }}>
        {/* Заголовок + кнопка VIEW MORE */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="text" sx={{ width: 200, fontSize: '1.5rem' }} />
            <Skeleton variant="rounded" sx={{ width: 90, height: 28, borderRadius: 1 }} />
        </Box>

        {/* 6 карточек */}
        <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
                <Grid key={i} size={{ xs: 6, sm: 4, md: 2 }}>
                    <MovieCardItemSkeleton />
                </Grid>
            ))}
        </Grid>
    </Box>
)