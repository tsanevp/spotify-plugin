
export default function DisplayReview(
    {
        tracks,
        newPlaylist,
        countPlaylistsMerged,
        countTracksAdded,
        setNewPlaylist,
        createPlaylist,
    }: Readonly<{
        tracks: Map<string, PlaylistTrackObject>;
        newPlaylist: any;
        countPlaylistsMerged: number;
        countTracksAdded: number;
        setNewPlaylist: (playlist: any) => void;
        createPlaylist: () => void;
    }>
) {

    return (
        <div className="flex-1 overflow-auto p-5 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
            {!tracks && <h1>loading...</h1>}
            <form onSubmit={() => createPlaylist()} className="w-full flex flex-col gap-6">
                <div className="flex flex-col">
                    <label htmlFor="playlist-name" className="text-xl font-medium">Playlist Name</label>
                    <input
                        id="playlist-name"
                        type="text"
                        className="bg-white text-black rounded mt-2 p-2 text-sm"
                        placeholder="Enter name..."
                        required
                        value={newPlaylist.name}
                        onChange={(event) => {
                            setNewPlaylist({ ...newPlaylist, name: event.target.value })
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="playlist-description" className="text-xl font-medium">Playlist Description</label>
                    <textarea
                        id="playlist-description"
                        className="bg-white text-black rounded mt-2 p-2 text-sm"
                        placeholder="Enter description..."
                        rows={5}
                        cols={20}
                        value={newPlaylist.description}
                        onChange={(event) => {
                            setNewPlaylist({ ...newPlaylist, description: event.target.value })
                        }}
                    />
                </div>

                <div>
                    <p className="text-xl font-medium">Playlist Visibility</p>
                    <div className="mt-2">
                        <label htmlFor="playlist-visible">Yes</label>
                        <input
                            type="radio"
                            id="playlist-visible"
                            name="playlist-visibility"
                            className="mx-2"
                            defaultChecked={newPlaylist.public}
                            onChange={() =>
                                setNewPlaylist({ ...newPlaylist, public: true })
                            }
                        />
                        <label htmlFor="playlist-hidden">No</label>
                        <input
                            type="radio"
                            id="playlist-hidden"
                            name="playlist-visibility"
                            className="mx-2"
                            defaultChecked={!newPlaylist.public}
                            onChange={() =>
                                setNewPlaylist({ ...newPlaylist, public: false })
                            }
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-medium">Stats</h1>
                    <p>Playlists Merged: {countPlaylistsMerged}</p>
                    <p>Number of Songs: {countTracksAdded}</p>
                </div>
            </form>
        </div>
    );
}