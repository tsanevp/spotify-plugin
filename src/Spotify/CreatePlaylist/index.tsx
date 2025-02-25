import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

export default function CreatePlaylist() {
    const [playlists, setPlaylists] = useState<UsersPlaylists | null>(null);
    const [tracks, setTracks] = useState<Set<PlaylistTrackObject>>(new Set());
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    async function fetchPlaylists() {
        const response = await fetch("http://localhost:5000/user/playlists", {
            method: "GET"
        });
        const playlists = await response.json();

        setPlaylists(playlists);
    }

    async function fetchPlaylist(playlistId: string, playlistName?: string) {
        try {
            let offset = 0;
            while (true) {
                let url = `http://localhost:5000/user/playlists/${playlistId}/tracks?offset=${offset}&limit=100`;
                const response = await fetch(url, {
                    method: "GET"
                });
                const tracks = (await response.json());
                offset += 100;

                setTracks((prev) => {
                    const newSet = new Set(prev);
                    tracks.items.forEach((track: PlaylistTrackObject) => {
                        track.playlistName = playlistName;
                        newSet.add(track);
                    });

                    return newSet;
                });

                if (!tracks.next) break;

            }
        } catch {
            console.log("SHIT")
        }
    }

    const checkboxClicked = (playlistId?: string, playlistName?: string) => {
        if (!playlistId) return;

        fetchPlaylist(playlistId, playlistName);
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(playlistId)) {
                newSet.delete(playlistId);
            } else {
                newSet.add(playlistId);
            }
            return newSet;
        });
    };

    function isTrackObject(track: TrackObject | EpisodeObject): track is TrackObject {
        return (track as TrackObject).album !== undefined;
    }

    function formatDuration(durationMs?: number): string {
        if (!durationMs) return 'N/A';
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);
    return (
        <div id="container" className="grid grid-cols-2 gap-3 select-none">
            <div className="bg-blue-700 p-3 h-screen flex flex-col">
                <div className="header p-5 text-2xl flex justify-between">
                    1. Select Playlist(s) to merge
                </div>

                <div className="content flex-1 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
                    {!playlists && <h1>loading...</h1>}
                    {playlists?.items.map((playlist) => (
                        <div key={playlist?.id} className="p-2 bg-gray-200 rounded m-2 flex h-20 justify-between">
                            <div className="flex">
                                <div className="flex flex-wrap content-center justify-center ml-3">
                                    {
                                        playlist.id && selectedItems.has(playlist.id) ?
                                            <MdOutlineCheckBox onClick={() => checkboxClicked(playlist.id, playlist.name)} size={30} /> :
                                            <MdOutlineCheckBoxOutlineBlank onClick={() => checkboxClicked(playlist.id, playlist.name)} size={30} />
                                    }
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
            <div className="bg-green-700 p-3 h-screen flex flex-col">
                <div className="header p-5 text-2xl flex justify-between">
                    2. Review and create playlist
                </div>

                <div className="content flex-1 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
                    {!tracks && <h1>loading...</h1>}
                    <table className="border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Add</th>
                                <th className="border p-2">#</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Source</th>
                                <th className="border p-2">Album</th>
                                <th className="border p-2">Length</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(tracks).map((track: PlaylistTrackObject, index) => {
                                if (isTrackObject(track.track)) {
                                    return (
                                        <tr key={track.track.id} className="hover:bg-gray-100">
                                            <td className="border p-2">{index}</td>
                                            <td className="border p-2">{index}</td>
                                            <td className="border p-2">{track.track.name}</td>
                                            <td className="border p-2">{track.playlistName}</td>
                                            <td className="border p-2">{track.track.album?.name}</td>
                                            <td className="border p-2">{formatDuration(track.track?.duration_ms)}</td>
                                        </tr>
                                    );
                                }

                                // If it's an EpisodeObject, handle it differently
                                return (
                                    <tr key={track.track.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{index}</td>
                                        <td className="border p-2">{index}</td>
                                        <td className="border p-2">{track.track.name}</td>
                                        <td className="border p-2">{track.playlistName}</td>
                                        <td className="border p-2">No Album (Episode)</td>
                                        <td className="border p-2">{track.track.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
