import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const handleErrors = (error: FetchBaseQueryError) => {
    if (error) {
        switch (error.status) {

        }
    }
}