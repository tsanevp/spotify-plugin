import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

function SearchBar({ onSearch }: Readonly<{ onSearch: any; }>) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="relative flex items-center">
            <IoSearchOutline size={24} className="absolute ml-2 text-gray-500" />
            <input
                type="text"
                placeholder="Search for..."
                className='bg-white text-black pl-10 p-2 border border-gray-300 rounded-3xl focus:outline-non'
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>

    );
}

export default SearchBar;