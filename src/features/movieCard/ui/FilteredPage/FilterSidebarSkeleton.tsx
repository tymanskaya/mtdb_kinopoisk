import { Box, Paper, Skeleton, Stack} from '@mui/material';

export const FilterSidebarSkeleton = () => {
    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, width: 280 }}>
            <Stack spacing={3}>
                {/* Заголовок Filters / Sort */}
                <Box>
                    <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                </Box>

                {/* Секция Sort By */}
                <Box>
                    <Skeleton variant="text" width="30%" height={20} sx={{ mb: 0.5 }} />
                    <Skeleton variant="rounded" width="100%" height={40} sx={{ borderRadius: 1 }} />
                </Box>

                {/* Секция Rating Slider */}
                <Box>
                    <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width="90%" height={4} sx={{ mx: 'auto', mb: 1 }} />
                </Box>

                {/* Секция Жанров (Chips) */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {/* Создаем 15 случайных "чипсов" разной ширины */}
                    {[80, 100, 70, 90, 60, 110, 85, 75, 95, 65, 100, 80, 70, 90, 60].map((width, i) => (
                        <Skeleton
                            key={i}
                            variant="rounded"
                            width={width}
                            height={28}
                            sx={{ borderRadius: 4 }}
                        />
                    ))}
                </Box>

                {/* Кнопка Reset Filters */}
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height={40}
                    sx={{ borderRadius: 1, mt: 2 }}
                />
            </Stack>
        </Paper>
    );
};
