// src/features/movieCard/ui/FilteredPage/Sidebar/SidebarSkeleton.tsx
import { Box, Skeleton } from '@mui/material'

export const SidebarSkeleton = () => (
    <Box sx={{ width: '100%' }}>
        {/* Filters / Sort */}
        <Skeleton variant="text" sx={{ width: 130, fontSize: '1.25rem', mb: 3 }} />

        {/* Sort by label + Select */}
        <Skeleton variant="text" sx={{ width: 60, fontSize: '0.875rem', mb: 0.5 }} />
        <Skeleton variant="rounded" sx={{ width: '100%', height: 40, mb: 3, borderRadius: 1 }} />

        {/* Rating label + Slider */}
        <Skeleton variant="text" sx={{ width: 140, fontSize: '0.875rem', mb: 1.5 }} />
        <Skeleton variant="rounded" sx={{ width: '100%', height: 6, mb: 3, borderRadius: 4 }} />

        {/* Genre chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
            {[70, 90, 60, 80, 100, 55, 75, 85, 65, 90, 70, 60, 80, 95, 70, 75, 65, 80].map((w, i) => (
                <Skeleton key={i} variant="rounded" sx={{ width: w, height: 24, borderRadius: 4 }} />
            ))}
        </Box>

        {/* Reset button */}
        <Skeleton variant="rounded" sx={{ width: '100%', height: 36, borderRadius: 1 }} />
    </Box>
)