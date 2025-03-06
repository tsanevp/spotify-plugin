import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer"
import playlistReducer from "./Playlists/reducer"
import searchResultReducer from "./Search/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
        playlistReducer,
        searchResultReducer,
    },
});

export default store;