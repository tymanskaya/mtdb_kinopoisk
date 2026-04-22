import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {notifyService} from "@/common/util/notifications/notifyService.ts";


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
                    notifyService.emit((result.error.data as { error: string }).error, { type: 'error', theme: 'colored' })
                    break

                // case 429:
                //     // ✅ 1. Type Assertions
                //     // toast((result.error.data as { message: string }).message, { type: 'error', theme: 'colored' })
                //     // ✅ 2. JSON.stringify
                //     // toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                //     // ✅ 3. Type Predicate
                //     if (isErrorWithMessage(result.error.data)) {
                //         toast(result.error.data.message, { type: 'error', theme: 'colored' })
                //     } else {
                //         toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                //     }
                //     break
                //
                // default:
                //     toast('Some error occurred', { type: 'error', theme: 'colored' })
            }
            // console.warn('[API Error]', result.error)
            // const { status } = result.error
            //
            // // 1. Ошибка сети (нет интернета, CORS, сервер недоступен)
            // if (status === 'FETCH_ERROR') {
            //     notifyService.emit(
            //         'Network error. Please check your internet connection.',
            //         'error'
            //     )
            //     return result
            // }
            //
            // // 2. Ошибка парсинга ответа
            // if (status === 'PARSING_ERROR') {
            //     const originalStatus = (result.error as { originalStatus?: number }).originalStatus
            //     if (originalStatus === 401) {          // ← 401 живёт здесь
            //         notifyService.emit('Unauthorized...', 'error')
            //     }
            //     return result
            // }
            //
            // // 3. HTTP ошибки
            // switch (status) {
            //     case 401:
            //         notifyService.emit(
            //             'Unauthorized. Invalid or expired API token.',
            //             'error'
            //         )
            //         break
            //
            //     case 404:
            //         notifyService.emit(
            //             `Not found: ${typeof args === 'object' && 'url' in args ? args.url : 'unknown endpoint'}`,
            //             'warning'
            //         )
            //         break
            //
            //     case 429:
            //         notifyService.emit(
            //             'Too many requests. Please slow down.',
            //             'warning'
            //         )
            //         break
            //
            //     case 500:
            //     case 502:
            //     case 503:
            //         notifyService.emit(
            //             'Server error. Please try again later.',
            //             'error'
            //         )
            //         break
            //
            //     default:
            //         notifyService.emit(
            //             `Unexpected error (${status}). Please try again.`,
            //             'error'
            //         )
            // }
        }

        return result
    },
    endpoints: () => ({}),
})