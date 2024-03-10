import api from './index'
import { IAuthLoginRequest, IAuthTokenResponse } from '@/types/auth'

export function emailLogin(data: IAuthLoginRequest) {
    return api.post(
        '/auth/token/',
        {
            grant_type: 'password',
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
            ...data
        },
        {
            headers: { "Content-Type": "application/json", },
        }
    )
}

export function refreshToken(refreshToken: string) {
    return api.post(
        '/auth/token/',
        {
            grant_type: 'refresh_token',
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
            refresh_token: refreshToken
        },
        {
            headers: { "Content-Type": "application/json", },
        }
    )
}

export function revokeToken({ access_token, token_type }: IAuthTokenResponse ) {
    return api.post(
        '/auth/revoke-token/',
        {
            client_id: process.env.REACT_APP_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
            token: access_token
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token_type} ${access_token}`,
            },

        }
    )
}
