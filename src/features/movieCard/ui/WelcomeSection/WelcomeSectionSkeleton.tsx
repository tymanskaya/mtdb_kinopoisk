import {Box, Skeleton} from "@mui/material";

export const WelcomeSectionSkeleton = () => {
    return(
        <Box sx={{
            width: '100%',
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
        }}>
            {/* Заголовок */}
            <Skeleton variant="text" sx={{ width: 380, fontSize: '2rem' }} />
            {/* Подзаголовок */}
            <Skeleton variant="text" sx={{ width: 240, fontSize: '1rem' }} />
            {/* Строка поиска + кнопка */}
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Skeleton variant="rounded" sx={{ width: 320, height: 40 }} />
                <Skeleton variant="rounded" sx={{ width: 80, height: 40 }} />
            </Box>
        </Box>
    )
}


