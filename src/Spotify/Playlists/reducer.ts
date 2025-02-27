import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistState {
    playlists: UsersPlaylists | null;
}

const initialState: PlaylistState = {
    playlists: null,
};

const playlistsSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        setPlaylists: (state, action: PayloadAction<UsersPlaylists>) => {
            state.playlists = action.payload;
          
        // updatePlaylists: (state, { payload: playlist }) => {

        }
    },
});

export const { setPlaylists } = playlistsSlice.actions;
export default playlistsSlice.reducer;