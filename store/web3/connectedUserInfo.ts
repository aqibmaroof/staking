import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IUserData} from './types'

interface  IState {
    dataUser: IUserData | undefined,
    userConnected: boolean,
    connectedWallet: string,
    loggedInUser: any,
}


const initialState:IState = {
    dataUser: undefined,
    userConnected: false,
    connectedWallet: '',
    loggedInUser: {},
}

export const connectedUserInfo = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setConnectedUser: (state: any, action: PayloadAction<IUserData>) => {
            state.dataUser = action?.payload
        },
        setConnectedUserXana: (state: any, action: PayloadAction<any>) => {
            state.loggedInUser = action?.payload
        },

        walletCredentials: (state: any, action: PayloadAction<{userConnected :boolean, connectedWallet: string }>) => {
            state.userConnected = action?.payload?.userConnected
            state.connectedWallet = action?.payload?.connectedWallet
        },
    },
})

export const {
    setConnectedUser,
    setConnectedUserXana,
    walletCredentials,
} = connectedUserInfo.actions

export default connectedUserInfo.reducer
