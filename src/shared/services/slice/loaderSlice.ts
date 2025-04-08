import { createSlice } from "@reduxjs/toolkit";
interface loaderState{
    loading: boolean;
}
const initialState: loaderState ={
    loading: false
};
const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;

