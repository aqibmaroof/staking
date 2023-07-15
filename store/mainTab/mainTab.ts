import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabObj {
  key: string;
  title: string;
  chain?: number;
  rpcUrl?: string;
}

interface IState {
  currentTab: TabObj | undefined;
}

const initialState: IState = {
  currentTab: undefined,
};

export const tabSlice = createSlice({
  name: "tabReducer",
  initialState,
  reducers: {
    setCurrentTab: (state: any, action: PayloadAction<TabObj | undefined>) => {
      state.currentTab = action?.payload;
    },
  },
});

export const { setCurrentTab } = tabSlice.actions;

export default tabSlice.reducer;
