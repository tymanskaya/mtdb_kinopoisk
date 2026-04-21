import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {notifyService} from "@/common/util/notifications/notifyService.ts";


const isErrorWithMessage = (data: unknown): data is { message: string } =>
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as Record<string, unknown>).message === 'string'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Movie', 'Auth'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_KEY}`)
                return headers
            },
        })(args, api, extraOptions)

        if (result.error) {
            switch (result.error.status) {
                case 404:
                    notifyService.emit(
                        (result.error.data as { error: string }).error ?? 'Not found',
                        'error'
                    )
                    break

                case 429:
                    if (isErrorWithMessage(result.error.data)) {
                        notifyService.emit(result.error.data.message, 'warning')
                    } else {
                        notifyService.emit('Too many requests', 'warning')
                    }
                    break

                default:
                    notifyService.emit('Some error occurred', 'error')
            }
        }

        return result
    },
    endpoints: () => ({}),
})