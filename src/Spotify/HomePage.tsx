import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from "./Playlists/reducer";
import { MdOutlineCheckBox } from 'react-icons/md';

export default function HomePage() {
  const dispatch = useDispatch();
  const { playlists } = useSelector((state: any) => state.playlistReducer);

  async function fetchPlaylists() {
    try {
      if (playlists) {
        return;
      }

      const response = await fetch("http://localhost:5000/user/playlists", {
        method: "GET",
        credentials: 'include'
      });

      if (!response.ok) {
        return
      }

      const results = await response.json();
      dispatch(setPlaylists(results));
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div id="container" className="flex flex-col lg:flex-row h-full p-3 pt-0 gap-3 bg-[#000] text-white select-none">
      {/* Left Container */}
      <div className="flex flex-col flex-1 border rounded bg-[#121212]">
        <div className="header p-5 text-2xl flex justify-between flex-shrink-0">
          Your Playlists
        </div>

        <div className="flex-1 overflow-auto p-3 flex-grow scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
          {!playlists && <h1>loading...</h1>}
          {playlists?.items.map((playlist: SimplifiedPlaylistObject) => (
            <div key={playlist?.id} className="p-2 hover:bg-[#1f1f1f] rounded m-2 flex h-20 justify-between">
              <div className="flex">
                <div className="flex flex-wrap content-center justify-left">
                  <MdOutlineCheckBox size={30} />
                </div>
                <div className="playlist-image ml-5">
                  <img src={playlist?.images ? playlist.images[0].url : ''} alt="playlist screenshot" className="h-full w-auto object-cover aspect-square" />
                </div>
                <div className="playlist-name-owner ml-5">
                  <h2 className="text-xl font-semibold">{playlist.name}</h2>
                  <p className="text-lg ">{playlist.owner?.display_name}</p>
                </div>
              </div>
              <div className="playlist-items justify-end mr-5 flex-wrap content-center">
                <h2 className="text-lg font-semibold">Items</h2>
                <p className="">{playlist.tracks?.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Container */}
      <div className="flex flex-col flex-1 border rounded bg-[#121212]">
        <div className="header p-5 text-2xl flex justify-between flex-shrink-0">
          Today's Hits
        </div>

        <div className="flex-1 overflow-auto p-3 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
          {/* Content here */}
        </div>
      </div>
    </div>
  )
}
