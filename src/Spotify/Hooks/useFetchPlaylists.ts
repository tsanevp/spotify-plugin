import { useDispatch, useSelector } from "react-redux";
import { setPlaylists } from "../Playlists/reducer";
import * as client from "../Playlists/client";

export const useFetchPlaylists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: any) => state.playlistReducer.playlists);

  const fetchPlaylists = async () => {
    try {
      if (playlists) return;

      const results = await client.getUserPlaylists();
      if (!results) {
        console.error("Error fetching playlists");
      } else {
        dispatch(setPlaylists(results));
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return fetchPlaylists;
};
