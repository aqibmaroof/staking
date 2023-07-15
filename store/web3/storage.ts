import { IUserData } from './types'

const storageToken = 'user-information'

export function getUser() {
    const token = localStorage.getItem(storageToken)
    return (token === null ? undefined : JSON.parse(token)) as unknown as
        | undefined
        | IUserData
}

export function setUser(payload?: IUserData) {
    if (payload) {
        localStorage.setItem(storageToken, JSON.stringify(payload))
    } else {
        localStorage.removeItem(storageToken)
    }

    return payload
}
