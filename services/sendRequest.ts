// import { storageRefreshToken, storageToken } from '@/constants/wallet'
import axios from 'axios'
import { refreshToken as APIRefreshToken } from '../services/auth'
// { AxiosError, AxiosRequestConfig, AxiosResponse }
async function sendRequest(payload, doesReturnHeader) {
    try {
        payload.headers = payload.headers
            ? payload.headers
            : { Authorization: 'Bearer ' + AccessToken() }

        if (doesReturnHeader) {
            const rest = await axiosInstance.request(payload)
            return rest
        }

        const response = await axiosInstance.request(payload)
        return Promise.resolve(response?.data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (err) => {
        const { response, config } = err
        try {
            if (response?.status === 401) {
                const rest = await APIRefreshToken()
                if (!rest || !rest.data || !rest.data.newToken) {
                    if (!!location && !!localStorage) {
                        localStorage.clear()
                        location.href = location.origin
                    }
                    return response
                }

                setAccessToken(rest.data.newToken)
                if (config.headers['Authorization']) {
                    config.headers['Authorization'] =
                        'Bearer ' + rest.data.newToken
                } else {
                    config.headers['Authorization'] = ''
                }

                return axiosInstance(config)
            } else if (response?.status === 403) {
                if (!!location && !!localStorage) {
                    localStorage.clear()
                    location.href = location.origin
                }
            } else if (response?.status === 455) {
                const { data } = err.response?.data
                if (
                    !!err.response?.data &&
                    !!data &&
                    !!location &&
                    !location.pathname.includes('maintenance')
                ) {
                    location.href = location.origin + '/maintenance'
                }
            }

            return response
        } catch (error) {
            return error
        }
    },
)

export function AccessToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem('accessToken')
    return token === null ? undefined : token
}

export function setAccessToken(value) {
    if (value) {
        localStorage.setItem('accessToken', value)
    } else {
        localStorage.removeItem('accessToken')
    }

    return value
}

export function refreshToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem('refreshToken')
    return token === null ? undefined : token
}

export function setRefreshToken(value) {
    if (value) {
        localStorage.setItem('refreshToken', value)
    } else {
        localStorage.removeItem('refreshToken')
    }

    return value
}

export default sendRequest
