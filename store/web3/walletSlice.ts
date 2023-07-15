import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isModalNetwork: false,
    address: undefined,
    chainId: undefined,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setModalNetwork: (state: any, action: PayloadAction<boolean>) => {
            state.isModalNetwork = action.payload
        },
        setAddress: (
            state: any,
            action: PayloadAction<string | undefined>,
        ) => {
            state.address = action.payload
        },
        setChainID: (
            state: any,
            action: PayloadAction<any>,
        ) => {
            state.chainId = action.payload
        },
    },
})

export const { setAddress, setChainID, setModalNetwork } = walletSlice.actions

export default walletSlice.reducer
