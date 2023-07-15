import sendRequest, {
    AccessToken,
    refreshToken as getRefreshToken,
} from './sendRequest'

const URL = process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/refresh-token'

export async function refreshToken() {
    const token = AccessToken()
    const refreshToken = getRefreshToken()

    if (!token || !refreshToken) return undefined

    return sendRequest(
        {
            url: URL,
            method: 'POST',
            data: { token, refreshToken },
        },
        true,
    )
}
