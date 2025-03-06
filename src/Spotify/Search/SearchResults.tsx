import { useSelector } from "react-redux";

export default function SearchResults() {
    const filters = ['All', 'Artists', 'Albums', 'Songs', 'Playlists', 'Shows', 'Episodes', 'Audiobooks'];
    // const { profile } = useSelector((state: any) => state.accountReducer);
    const { searchResult } = useSelector((state: any) => state.searchResultReducer);

    // function formatDuration(durationMs?: number): string {
    //     if (!durationMs) return 'N/A';

    //     const minutes = Math.floor(durationMs / 60000);
    //     const seconds = Math.floor((durationMs % 60000) / 1000);
    //     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    // }

    return (
        <div className="flex flex-col flex-1 border rounded bg-[#121212]">
            <div className="header p-5 flex text-xs font-medium gap-x-3">
                {/* filters */}
                {filters?.map((filter) => {
                    return <a href="_blank" key={filter} className="bg-black px-3 py-2 rounded-2xl cursor-pointer">{filter}</a>
                })}
            </div>

            <div className="flex-1 overflow-auto p-5 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
                <div className="w-full">
                    <div className="flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300">
                        {
                            searchResult?.artists?.items.map((artist: Artist) => {
                                return (
                                    <div key={artist.id} className="card min-w-fit p-3 bg-red-200">
                                        <div className="rounded-full flex flex-wrap justify-center content-center">
                                            {artist.images ? (
                                                <img src={artist.images[0].url} alt={`profile`} className="w-30 h-30 rounded-full" />
                                            ) : (
                                                <span className="text-gray-800 w-10 h-10">{artist.name?.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <p>{artist?.name}</p>
                                            <span className="text-sm">Artist</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.tracks?.items.map((track: TrackObject) => {
                            return <p key={track.id}>{track?.name}</p>
                        })
                    }
                </div>

                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.albums?.items.map((track: Album) => {
                            return <p key={track.id}>{track?.name}</p>
                        })
                    }
                </div>

                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.playlists?.items.map((track: SimplifiedPlaylistObject) => {
                            return <p key={track?.id}>{track?.name}</p>
                        })
                    }
                </div>

                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.shows?.items.map((track: Show) => {
                            return <p key={track?.id}>{track?.name}</p>
                        })
                    }
                </div>

                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.episodes?.items.map((track: EpisodeObject) => {
                            return <p key={track?.id}>{track?.name}</p>
                        })
                    }
                </div>

                <div className="flex flex-wrap gap-x-3">
                    {
                        searchResult?.audiobooks?.items.map((track: AudioBooks) => {
                            return <p key={track?.id}>{track?.name}</p>
                        })
                    }
                </div>
                {/* <div className="flex gap-x-2">
                    <div id="top-result" className="flex-1">
                        <h1 className="text-2xl font-bold">Top Result</h1>
                        <div className="flex flex-col bg-red-500 rounded-xl p-5 mt-2">
                            <div className="rounded-full bg-black w-20 h-20 overflow-hidden flex flex-wrap justify-center content-center">
                            </div>
                            <h1 className="text-3xl font-bold mt-5">SZA</h1>
                            <p className="text-sm mt-2">Artist</p>
                        </div>
                    </div>
                    <div id="songs" className="flex-1">
                        <h1 className="text-2xl font-bold">Songs</h1>
                        <div className="flex flex-col bg-red-500 rounded-xl p-5 mt-2">
                            <div className="hover:bg-[#1f1f1f] h-14 flex items-center">
                                <div className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center"></div>
                                <div className="p-2 pl-4 text-left w-7/16">
                                    <div className="flex flex-col">
                                        <p className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" >NAME</p>
                                        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">artist</p>
                                    </div>
                                </div>
                                <div className="p-2 text-sm">{formatDuration(20000)}</div>
                            </div>

                            <div className="hover:bg-[#1f1f1f] h-14 flex items-center">
                                <div className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center"></div>
                                <div className="p-2 pl-4 text-left w-7/16">
                                    <div className="flex flex-col">
                                        <p className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" >NAME</p>
                                        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">artist</p>
                                    </div>
                                </div>
                                <div className="p-2 text-sm">{formatDuration(20000)}</div>
                            </div>

                            <div className="hover:bg-[#1f1f1f] h-14 flex items-center">
                                <div className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center"></div>
                                <div className="p-2 pl-4 text-left w-7/16">
                                    <div className="flex flex-col">
                                        <p className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" >NAME</p>
                                        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">artist</p>
                                    </div>
                                </div>
                                <div className="p-2 text-sm">{formatDuration(20000)}</div>
                            </div>
                            <div className="hover:bg-[#1f1f1f] h-14 flex items-center">
                                <div className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center"></div>
                                <div className="p-2 pl-4 text-left w-7/16">
                                    <div className="flex flex-col">
                                        <p className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap" >NAME</p>
                                        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">artist</p>
                                    </div>
                                </div>
                                <div className="p-2 text-sm">{formatDuration(20000)}</div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </div >




        // <div id="default-modal" tabIndex={-1}  className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 justify-center items-center w-full md:inset-0 h-full flex bg-[var(--background-tinted-press-test)]">
        //     <div className="relative w-full max-w-2xl max-h-full">
        //         {/* <!-- Modal content --> */}
        //         <div className="relative bg-white rounded-lg dark:bg-gray-700">
        //             {/* <!-- Modal header --> */}
        //             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        //                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        //                     Search Results
        //                 </h3>
        //                 <IoClose title="Close modal" className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" />
        //             </div>

        //             {/* <!-- Modal body --> */}
        //             <div className="p-4 md:p-5 space-y-4">
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        //                 </p>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        //                 </p>
        //             </div>
        //             {/* <!-- Modal footer --> */}
        //             <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        //                 <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
        //                 <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}