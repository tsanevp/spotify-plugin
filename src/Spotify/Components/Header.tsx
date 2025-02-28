import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineLibraryAdd } from "react-icons/md";

import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function Header() {
  const { profile } = useSelector((state: any) => state.accountReducer);

  const onSearch = (() => {
    console.log("searching");
  });

  return (
    <header className="flex-shrink-0 text-white p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Spotify Playlister</h1>

        {/* Navigation Links */}
        <div className="flex gap-10 absolute left-1/2 transform -translate-x-1/2">
          <div className="flex gap-6 items-center">
            <Link to="/">
              <div className="w-10 h-10 bg-[var(--background-elevated-base)] rounded-full flex justify-center items-center">
                <FiHome size={24} title="Go Home" />
              </div>
            </Link>
            <SearchBar onSearch={onSearch} />
            <Link to="/create-playlist" title="Create New Playlist">
              <div className="w-10 h-10 bg-[var(--background-elevated-base)] rounded-full flex justify-center items-center">
                <MdOutlineLibraryAdd size={24} />
              </div>
            </Link>
          </div>
        </div>

        <div>
          {!profile ? (
            <>
              <a href="https://www.spotify.com/us/signup" target="_blank" rel="noopener noreferrer" className="mr-6" title="Sign up for spotify">
                Sign up
              </a>
              <a
                href="http://localhost:5000/auth/login"
                className="inline-block py-2 px-4 bg-white text-white font-semibold rounded hover:bg-blue-600 transition duration-200" title="Login to spotify"
              >
                Login
              </a>
            </>
          ) : (
            <div className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center">
              {profile.images ? (
                <img src={profile.images[0].url} alt={`profile`} className="w-9 h-9 rounded-full" />
              ) : (
                <span className="text-gray-800 w-10 h-10">{profile.display_name.charAt(0)}</span>
              )}
            </div>
          )}


        </div>
      </nav>
    </header>
  );
};
