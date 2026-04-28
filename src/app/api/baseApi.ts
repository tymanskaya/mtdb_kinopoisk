import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {notifyService} from "@/common/util/notifications/notifyService.ts";
import {isErrorWithProperty} from "@/common/util";



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
            // const { status } = result.error
            console.log('404 data:', result.error.data)
            switch (result.error.status) {

                case 'FETCH_ERROR':
                case 'PARSING_ERROR':
                case 'CUSTOM_ERROR':
                case 'TIMEOUT_ERROR':
                    notifyService.emit(result.error.error, 'error')
                    break
                case 404:
                        //  'status_message' этот ключ ищется в объекте и он же становится доступен после if
                        if(isErrorWithProperty(result.error.data, 'status_message')) {
                            notifyService.emit(result.error.data.status_message, 'error')}
                        else {
                            notifyService.emit(JSON.stringify(result.error.data))
                        }
                        break

                case 401:
                case 429:
                    if (isErrorWithProperty(result.error.data, 'status_message')) {
                        notifyService.emit(result.error.data.status_message, 'error')}
                    else {
                        notifyService.emit(JSON.stringify(result.error.data))
                    }
                    break
                    default:
                        notifyService.emit(
                            `Unexpected error (${status}). Please try again.`,
                            'error'
                        )
            }

        }

        return result
    },
    endpoints: () => ({}),
})