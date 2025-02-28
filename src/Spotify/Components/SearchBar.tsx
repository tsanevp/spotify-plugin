import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

function SearchBar({ onSearch }: Readonly<{ onSearch: any; }>) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="group relative flex items-center ">
            <IoSearchOutline size={24} className="absolute ml-2 text-[var(--text-subdued)] group-hover:text-[var(--text-base)]" />
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