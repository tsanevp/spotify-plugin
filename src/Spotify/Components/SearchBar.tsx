import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
// import SearchResults from '../Search/SearchResults';
import { setSearchResult } from '../Search/reducer';
import { useDispatch } from 'react-redux';

function SearchBar({ onSearch }: Readonly<{ onSearch: any; }>) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    const onSearchSubmit = async () => {
        try {
            // Construct the query parameters
            const params = new URLSearchParams();
            params.append("q", searchTerm);
            params.append("type", ["album", "artist", "playlist", "track", "show", "episode", "audiobook"].toString());
            // params.append("q", q);
            // params.append("type", type);
            // if (market) params.append("market", market);
            // if (limit) params.append("limit", limit.toString());
            // if (offset) params.append("offset", offset.toString());
            // if (include_external) params.append("include_external", include_external);

            const response = await fetch(`http://localhost:5000/search?${params.toString()}`, {
                method: "GET",
                credentials: 'include'
            });

            if (!response.ok) {
                return
            }

            const results = await response.json() as Search;
            dispatch(setSearchResult(results));
        } catch (error) {
        }
    };


    return (
        <div className="group relative flex items-center ">
            <IoSearchOutline onClick={onSearchSubmit} size={24} className="absolute ml-2 text-[var(--text-subdued)] group-hover:text-[var(--text-base)]" />
            <input
                type="text"
                placeholder="Search for..."
                className='bg-[var(--background-elevated-base)] text-[var(--text-base)] pl-10 p-2 rounded-3xl placeholder-[var(--text-subdued)] focus:border-[var(--decorative-base)] focus:outline-none focus:ring-2 focus:ring-border border-[var(--decorative-base)]'
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;