import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
};

const accountSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setCurrentProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export const { setCurrentProfile } = accountSlice.actions;
export default accountSlice.reducer;