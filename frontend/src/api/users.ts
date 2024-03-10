import api from './index'
import { IAuthLoginRequest, IAuthTokenResponse } from '@/types/auth'
import { authStore } from '@/store/auth'

export function fetchMe() {
    return api.get(
        '/users/me/',
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${authStore.tokenData?.token_type} ${authStore.tokenData?.access_token}`
            },
        }
    )
}
