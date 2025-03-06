import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchResult: Search | null;
}

const initialState: SearchState = {
    searchResult: null,
};

const searchResultSlice = createSlice({
    name: "searchResult",
    initialState,
    reducers: {
        setSearchResult: (state, action: PayloadAction<Search>) => {
            state.searchResult = action.payload;
        }
    },
});

export const { setSearchResult } = searchResultSlice.actions;
export default searchResultSlice.reducer;