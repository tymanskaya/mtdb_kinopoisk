
import {notifyService} from "@/common/util/notifications/notifyService.ts";

import { z } from 'zod'


export const withZodTransform = <T>(schema: z.ZodSchema<T>, endpointName: string) =>
    (data: unknown): T => {
        const result = schema.safeParse(data)
        if (!result.success) {
            if (import.meta.env.DEV) {
                console.warn(`[Zod] ${endpointName}:`, result.error.issues)
            }
            notifyService.emit(`Unexpected data format (${endpointName})`, 'warning')
            return data as T
        }
        return result.data
    }
