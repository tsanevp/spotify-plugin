import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

export default function DisplayPlaylists({ playlists, selectedItems, checkboxClicked }:
    Readonly<{
        playlists: any;
        selectedItems: Set<string>;
        checkboxClicked: (playlistId?: string, playlistName?: string) => void;
    }>
) {
    return (
        <div className="md:flex-1 overflow-auto p-3 md:flex-grow scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
            {!playlists && <h1>loading...</h1>}
            {playlists?.items.map((playlist: SimplifiedPlaylistObject) => (
                <div key={playlist?.id} className="p-2 hover:bg-[#1f1f1f] rounded m-2 flex h-20 justify-between">
                    <div className="flex">
                        <div className="flex flex-wrap content-center justify-left">
                            {
                                playlist.id && selectedItems.has(playlist.id)
                                    ? <MdOutlineCheckBox
                                        onClick={() => checkboxClicked(playlist.id, playlist.name)}
                                        size={24}
                                    />
                                    : <MdOutlineCheckBoxOutlineBlank
                                        onClick={() => checkboxClicked(playlist.id, playlist.name)}
                                        size={24}
                                    />
                            }
                        </div>
                        <div className="playlist-image ml-5">
                            <img
                                src={playlist?.images
                                    ? playlist.images[0].url
                                    : ''
                                }
                                alt="playlist screenshot"
                                className="h-full w-auto object-cover aspect-square"
                            />
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
    );
}