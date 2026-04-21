type NotifyType = 'error' | 'warning' | 'info' | 'success'

type Listener = (message: string, type: NotifyType) => void

let listener: Listener | null = null

export const notifyService = {
    subscribe: (fn: Listener) => { listener = fn },
    unsubscribe: () => { listener = null },
    emit: (message: string, type: NotifyType = 'error') => {
        listener?.(message, type)
    },
}