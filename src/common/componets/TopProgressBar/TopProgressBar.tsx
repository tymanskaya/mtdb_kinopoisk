
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

export const TopProgressBar = () => {
    const isFetching = useSelector((state: RootState) =>
        Object.values(state.baseApi.queries).some(q => q?.status === 'pending')
    )

    if (!isFetching) return null

    return (
        <LinearProgress
            sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                height: '3px',
            }}
        />
    )
}