import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer"
import playlistReducer from "./Playlists/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
        playlistReducer,
    },
});

export default store;