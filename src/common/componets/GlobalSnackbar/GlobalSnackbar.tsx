import { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import {notifyService} from "@/common/util/notifications/notifyService.ts";

type NotifyType = 'error' | 'warning' | 'info' | 'success'

export const GlobalSnackbar = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState<NotifyType>('error')

    useEffect(() => {
        notifyService.subscribe((msg, t) => {
            setMessage(msg)
            setType(t)
            setOpen(true)
        })
        return () => notifyService.unsubscribe()
    }, [])

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                severity={type}
                variant="filled"
                onClose={() => setOpen(false)}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}