import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { useFetchPlaylists } from "../Hooks/useFetchPlaylists";
import DisplayPlaylists from "./DisplayPlaylists";
import DisplayTracks from "./DisplayTracks";
import DisplayReview from "./DisplayReview";
import { useMediaQuery } from "../Hooks/useMediaQuery";
import ContentContainer from "../Components/ContentContainer";

export default function CreatePlaylist() {
    const { profile } = useSelector((state: any) => state.accountReducer);
    const { playlists } = useSelector((state: any) => state.playlistReducer);
    const [tracks, setTracks] = useState<Map<string, PlaylistTrackObject>>(new Map());
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [allSelected, setAllSelected] = useState(false);

    const [newPlaylist, setNewPlaylist] = useState({
        name: '',
        description: '',
        public: false
    });
    const [step, setStep] = useState(0);
    const fetchPlaylists = useFetchPlaylists();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const createPlaylist = async () => {
        try {
            const body = {
                name: newPlaylist.name,
                public: newPlaylist.public,
                collaborative: false,
                decription: newPlaylist.description,
                tracks: getSelectedTrackIds(),
            };

            const results = await client.createPlaylist(body, profile.id);
            if (!results) {
                // eventually add in toaster msg for errors.
                console.log("SOME ERROR");

            } else {
                // Sucessfully added
                console.log("Playlist created!");
            }
        } catch (error) {
            // eventually add in toaster msg for errors.
            return;
        }

    }

    async function fetchPlaylistTracks(playlistId?: string, playlistName?: string) {
        if (!playlistId || !playlistName) {
            // log error in one of these two
            return;
        }

        try {
            let offset = 0;
            while (true) {
                const tracksFromResponse = await client.getPlaylistTracks(playlistId, offset);
                addTracksFromPlaylist(playlistId, playlistName, tracksFromResponse);
                offset += 100;

                // while loop is false
                if (!tracksFromResponse.next) break;
            }
        } catch {
            // add error logging
        }
    }

    const addTracksFromPlaylist = (playlistId: string, playlistName: string, tracksFromResponse: any) => {
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
    };

    const removePlaylistTracks = (playlistId: string) => {
        setTracks(prevTracks => {
            const newTracks = new Map(
                Array.from(prevTracks.entries()).filter(([_, track]) => track.playlistId !== playlistId)
            );
            return newTracks;
        });
    };

    const getSelectedTrackIds = () => {
        return Array.from(tracks.values())
            .filter((value) => value.selected)
            .map((value) => value.track.uri);
    }

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
                fetchPlaylistTracks(playlistId, playlistName);
            }
            return newSet;
        });
    };

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

    const displayPlaylists = () => {
        return (isMobile && step === 0) || !isMobile;
    }

    const displayTrackSelection = () => {
        return (isMobile && step === 1) || (!isMobile && step < 2);
    }

    const displayPlaylistReview = () => {
        return (isMobile && step === 2) || (!isMobile && step === 2);
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div
            id="container"
            className="h-full flex flex-col lg:flex-row px-12 lg:px-3 pb-3 gap-3 bg-[#000] text-white select-none"
        >
            {displayPlaylists() &&
                <ContentContainer
                    header={
                        <div className="header p-6 md:text-2xl lg:text-3xl font-bold flex justify-between flex-shrink-0">
                            1. Select Playlist(s) to merge
                            {isMobile && (
                                <button
                                    className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm md:text-xl lg:text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                    onClick={() => setStep(1)}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    }
                    content={
                        <DisplayPlaylists
                            playlists={playlists}
                            selectedItems={selectedItems}
                            checkboxClicked={checkboxClicked}
                        />
                    }
                />
            }

            {displayTrackSelection() &&
                <ContentContainer
                    header={
                        <div className="header p-6 md:text-2xl lg:text-3xl font-bold flex justify-between flex-shrink-0">
                            2. Review and create playlist
                            {isMobile && (
                                <div className="flex gap-x-4">
                                    <button
                                        className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm md:text-xl lg:text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                        onClick={() => setStep(0)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm md:text-xl lg:text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                        onClick={() => setStep(2)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                    content={
                        <DisplayTracks
                            tracks={tracks}
                            allSelected={allSelected}
                            setAllSelected={setAllSelected}
                            selectAllTracks={selectAllTracks}
                            toggleTrackSelection={toggleTrackSelection}
                        />
                    }

                    footer={
                        !isMobile && (
                            <button
                                className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm md:text-xl lg:text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                onClick={() => setStep(2)}
                            >
                                Next
                            </button>
                        )
                    }

                />
            }

            {displayPlaylistReview() &&
                <ContentContainer
                    header={<div className="header p-6 md:text-2xl lg:text-3xl font-bold flex justify-between flex-shrink-0">3. Create playlist</div>}
                    content={
                        <DisplayReview
                            tracks={tracks}
                            newPlaylist={newPlaylist}
                            countPlaylistsMerged={selectedItems.size}
                            countTracksAdded={getSelectedTrackIds().length}
                            setNewPlaylist={setNewPlaylist}
                            createPlaylist={createPlaylist}
                        />
                    }
                    footer={
                        <>
                            <button
                                className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-2xl !text-[#000] font-semibold rounded-full transition duration-200"
                                onClick={createPlaylist}
                            >
                                Create
                            </button>
                        </>
                    }
                />
            }
        </div>
    )
}
