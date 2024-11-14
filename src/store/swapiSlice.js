import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchSwapi = createAsyncThunk(
    "swapi/fetchSwapi",
    async (url) => {
        const response = await fetch(`https://swapi.dev/api/${url}`);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    data: null,
    loading: false,
};

const swapiSlice = createSlice({
    name: "swapi",
    initialState,
    reducers: {
        clearData: (state) => {
            state.data = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSwapi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSwapi.fulfilled, (state, action) => { // added action
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSwapi.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { clearData} = swapiSlice.actions;

export default swapiSlice.reducer;

