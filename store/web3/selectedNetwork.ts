import { createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import networkServices, { INetwork } from '../../services/network'

interface FetchError {
  errorMessage: string
}

const initialState: any = {
  errorMessage: null,

  isLoading: false,
  networksList: [],
  currentNetwork: null,
};


export const getNetworksList = createAsyncThunk<
    any,
    void,
    {
        rejectValue: FetchError
    }
>('network/getNetworksList', async (args, { rejectWithValue }) => {
    try {
        const networksList = await networkServices.getNetworksList()
        return networksList
    } catch (error) {
        return rejectWithValue(error as FetchError)
    }
})


export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setChainErrorMsg: (state: any, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setCurrentNetwork: (
      state: any,
      action: PayloadAction<any>,
  ) => {
      state.currentNetwork = action.payload
  },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getNetworksList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNetworksList.fulfilled, (state, action) => {
            state.isLoading = false
            state.networksList = action.payload.data
        })
        .addCase(getNetworksList.rejected, (state, action) => {
            if (action.payload) {
                state.errorMessage = action.payload.errorMessage
            } else {
                state.errorMessage = action.error.message as string
            }
        })
},
});

export const {
  setChainErrorMsg,
  setCurrentNetwork
} = networkSlice.actions;

export default networkSlice.reducer;
