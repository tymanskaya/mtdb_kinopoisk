import { Box, Skeleton } from '@mui/material'

export const SearchPageSkeleton = () => (
    <Box>
        {/* "Search results" */}
        <Skeleton variant="text" sx={{ width: 200, fontSize: '1.75rem', mb: 3 }} />

        {/* SearchBar: input + button */}
        <Box sx={{ display: 'flex', gap: '12px', mb: '24px' }}>
            <Skeleton variant="rounded" sx={{ flex: 1, height: 48, borderRadius: '8px' }} />
            <Skeleton variant="rounded" sx={{ width: 100, height: 48, borderRadius: '8px' }} />
        </Box>

        {/* "Enter a movie title..." */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" sx={{ width: 20, height: 20 }} />
            <Skeleton variant="text" sx={{ width: 260, fontSize: '1rem' }} />
        </Box>
    </Box>
)