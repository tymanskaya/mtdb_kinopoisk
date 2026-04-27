import { Box, Skeleton } from '@mui/material'

export const MovieCardSkeleton = () => (
    <Box sx={{ width: '100%' }}>
        <Skeleton
            variant="rectangular"
            sx={{ width: '100%', aspectRatio: '2/3', borderRadius: 2 }}
        />
        <Skeleton variant="text" sx={{ mt: 1, fontSize: '0.875rem' }} />
        <Skeleton variant="text" sx={{ width: '60%', fontSize: '0.75rem' }} />
    </Box>
)