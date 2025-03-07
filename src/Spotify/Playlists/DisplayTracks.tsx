import { FaRegClock } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useMediaQuery } from "../Hooks/useMediaQuery";

export default function DisplayTracks({ tracks, allSelected, setAllSelected, selectAllTracks, toggleTrackSelection }:
    Readonly<{
        tracks: Map<string, PlaylistTrackObject>;
        allSelected: boolean;
        setAllSelected: (newVal: boolean) => void;
        selectAllTracks: () => void;
        toggleTrackSelection: (trackId: string) => void;
    }>
) {
    function isTrackObject(track: TrackObject | EpisodeObject): track is TrackObject {
        return (track as TrackObject).album !== undefined;
    }

    function formatDuration(durationMs?: number): string {
        if (!durationMs) return 'N/A';

        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    const isMobile = useMediaQuery('(max-width: 1024px)')
    const iconSize = isMobile ? 16 : 24;

    return (
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
                        <th className="p-2 text-sm text-left"><FaRegClock size={iconSize} className="" /></th>
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
                                                track.selected
                                                    ? <MdOutlineCheckBox
                                                        onClick={() => toggleTrackSelection(trackId)}
                                                        size={24}
                                                    />
                                                    : <MdOutlineCheckBoxOutlineBlank
                                                        onClick={() => toggleTrackSelection(trackId)}
                                                        size={24}
                                                    />
                                            }
                                        </div>
                                    </td>
                                    <td className="p-2 pl-10 text-right w-10">{index}</td>
                                    <td className="p-2 pl-6 text-left w-7/16">
                                        <div className="flex flex-col">
                                            <p
                                                className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={track.track.name}
                                            >
                                                {track.track.name}
                                            </p>
                                            <p
                                                className="text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                                                title={artists}
                                            >
                                                {artists}
                                            </p>

                                        </div>

                                    </td>
                                    <td
                                        className="p-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={track.playlistName}
                                    >
                                        {track.playlistName}
                                    </td>
                                    <td
                                        className="p-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={track.track.album?.name}
                                    >
                                        {track.track.album?.name}
                                    </td>
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
    );
}