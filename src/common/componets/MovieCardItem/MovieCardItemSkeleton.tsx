import { Box, Skeleton } from '@mui/material'

export const MovieCardItemSkeleton = () => (
    <Box sx={{ height: '100%' }}>
        {/* Постер — точно 260px как .poster */}
        <Box sx={{ position: 'relative' }}>
            <Skeleton
                variant="rectangular"
                sx={{ width: '100%', height: 260 }}
            />

            {/* Рейтинг — 40x40, bottom: 8, right: 8 */}
            <Skeleton
                variant="circular"
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 40,
                    height: 40,
                }}
            />

            {/* Кнопка избранного — 36x36, top: 8, right: 8 */}
            <Skeleton
                variant="circular"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 36,
                    height: 36,
                }}
            />
        </Box>

        {/* .content padding: 12px + .title */}
        <Box sx={{ px: '12px', py: '12px' }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '85%' }} />
        </Box>
    </Box>
)