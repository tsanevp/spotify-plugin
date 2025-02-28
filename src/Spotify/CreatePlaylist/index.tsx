import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylists } from "../Playlists/reducer";

export default function CreatePlaylist() {
    const [tracks, setTracks] = useState<Map<string, PlaylistTrackObject>>(new Map());
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [allSelected, setAllSelected] = useState(false);
    const dispatch = useDispatch();
    const { playlists } = useSelector((state: any) => state.playlistReducer);


    async function fetchPlaylists() {
        try {
            if (playlists) {
                return;
            }

            const response = await fetch("http://localhost:5000/user/playlists", {
                method: "GET"
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

    async function fetchPlaylist(playlistId: string, playlistName?: string) {
        try {
            let offset = 0;
            while (true) {
                let url = `http://localhost:5000/user/playlists/${playlistId}/tracks?offset=${offset}&limit=100`;
                const response = await fetch(url, {
                    method: "GET"
                });
                const tracksFromResponse = await response.json();
                offset += 100;

                setTracks((prev) => {
                    const newMap = new Map<string, PlaylistTrackObject>(prev);
                    tracksFromResponse.items.forEach((track: PlaylistTrackObject) => {
                        if (track.track.id && !tracks.has(track.track.id)) {
                            track.playlistName = playlistName;
                            track.playlistId = playlistId;
                            track.selected = true;

                            const trackId = track.track.id;
                            if (!trackId) return;

                            newMap.set(trackId, track);
                        }

                    });

                    return newMap;
                });

                if (!tracksFromResponse.next) break;

            }
        } catch {
            console.log("SHIT")
        }
    }

    const removePlaylistTracks = (playlistId: string) => {
        setTracks(prevTracks => {
            const newTracks = new Map(
                Array.from(prevTracks.entries()).filter(([_, track]) => track.playlistId !== playlistId)
            );
            return newTracks;
        });
    };

    const toggleTrackSelection = (trackId: string) => {
        setTracks(prevTracks => {
            const newTracks = new Map(prevTracks);
            const track = newTracks.get(trackId);

            if (track) {
                const isSelected = !track.selected;
                if (!isSelected && allSelected) {
                    setAllSelected(false);
                }

                newTracks.set(trackId, { ...track, selected: isSelected });
            }

            return newTracks;
        });
    };


    const checkboxClicked = (playlistId?: string, playlistName?: string) => {
        if (!playlistId) return;

        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(playlistId)) {
                newSet.delete(playlistId);
                removePlaylistTracks(playlistId);
            } else {
                newSet.add(playlistId);
                fetchPlaylist(playlistId, playlistName);
            }
            return newSet;
        });
    };

    function isTrackObject(track: TrackObject | EpisodeObject): track is TrackObject {
        return (track as TrackObject).album !== undefined;
    }

    const selectAllTracks = () => {
        setAllSelected(true);
        setTracks(prevTracks => {
            const newTracks = new Map(
                Array.from(prevTracks.entries()).map(([trackId, track]) =>
                    [trackId, { ...track, selected: true }]
                )
            );

            return newTracks;
        });
    };


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
        <div id="container" className="flex flex-col lg:flex-row h-full px-3 pb-3 gap-3 bg-[#000] text-white select-none">
            {/* Left Container */}
            <div className="flex flex-col flex-1 border rounded bg-[#121212]">
                <div className="header p-5 text-2xl flex justify-between flex-shrink-0">
                    1. Select Playlist(s) to merge
                </div>

                <div className="flex-1 overflow-auto p-3 flex-grow scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
                    {!playlists && <h1>loading...</h1>}
                    {playlists?.items.map((playlist: SimplifiedPlaylistObject) => (
                        <div key={playlist?.id} className="p-2 hover:bg-[#1f1f1f] rounded m-2 flex h-20 justify-between">
                            <div className="flex">
                                <div className="flex flex-wrap content-center justify-left">
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

                <div className="footer p-5 text-lg flex justify-end gap-x-4 flex-shrink-0">
                    <button className="bg-[#191919] px-4 py-2 rounded">Back</button>
                </div>
            </div>

            {/* Right Container */}
            <div className="flex flex-col flex-1 border rounded bg-[#121212]">
                <div className="header p-5 text-2xl flex justify-between flex-shrink-0">
                    2. Review and create playlist
                </div>

                <div className="flex-1 overflow-auto p-3 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
                    {!tracks && <h1>loading...</h1>}
                    <table className="p-10 w-full table-fixed">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left w-12">
                                    <div className="flex content-center justify-center flex-nowrap">
                                        {
                                            allSelected ?
                                                <MdOutlineCheckBox onClick={() => setAllSelected(false)} size={24} /> :
                                                <MdOutlineCheckBoxOutlineBlank onClick={selectAllTracks} size={24} />
                                        }
                                    </div>
                                </th>
                                <th className="p-2 text-sm pl-10 text-right w-10">#</th>
                                <th className="p-2 text-sm pl-6 text-left w-7/16">Title</th>
                                <th className="p-2 text-sm text-left w-2/11">Source</th>
                                <th className="p-2 text-sm text-left w-2/11">Album</th>
                                <th className="p-2 text-sm text-left"><FaRegClock size={25} className="" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(tracks.entries()).map(([trackId, track], index: number) => {
                                if (isTrackObject(track.track)) {
                                    const artists = track.track.artists?.map(artist => artist.name).join(", ");
                                    return (
                                        <tr key={track.track.id} className="hover:bg-[#1f1f1f] h-14">
                                            <td className="p-2 text-left w-12">
                                                <div className="flex content-center justify-center flex-nowrap">

                                                    {
                                                        track.selected ?
                                                            <MdOutlineCheckBox onClick={() => toggleTrackSelection(trackId)} size={24} /> :
                                                            <MdOutlineCheckBoxOutlineBlank onClick={() => toggleTrackSelection(trackId)} size={24} />
                                                    }
                                                </div>
                                            </td>
                                            <td className="p-2 pl-10 text-right w-10">{index}</td>
                                            <td className="p-2 pl-6 text-left w-7/16">
                                                <div className="flex flex-col">
                                                    <p className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" title={track.track.name}>{track.track.name}</p>
                                                    <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={artists}>{artists}</p>

                                                </div>

                                            </td>
                                            <td className="p-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={track.playlistName}>{track.playlistName}</td>
                                            <td className="p-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={track.track.album?.name}>{track.track.album?.name}</td>
                                            <td className="p-2 text-sm">{formatDuration(track.track?.duration_ms)}</td>
                                        </tr>
                                    );
                                }

                                // If it's an EpisodeObject, handle it differently
                                return (
                                    <tr key={track.track.id} className="hover:bg-[#1f1f1f]">
                                        <td className="p-2">{index}</td>
                                        <td className="p-2">{index}</td>
                                        <td className="p-2">{track.track.name}</td>
                                        <td className="p-2">{track.playlistName}</td>
                                        <td className="p-2">No Album (Episode)</td>
                                        <td className="p-2">{track.track.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="footer p-5 text-lg flex justify-end gap-x-4 flex-shrink-0">
                    <button className="bg-[#191919] px-4 py-2 rounded">Cancel</button>
                    <button className="bg-[#191919] px-4 py-2 rounded">Create</button>
                </div>
            </div>
        </div>
    )
}
