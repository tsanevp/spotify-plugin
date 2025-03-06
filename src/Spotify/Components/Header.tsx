// import { Link } from "react-router-dom";
// import { FiHome } from "react-icons/fi";
// import { MdOutlineLibraryAdd } from "react-icons/md";
// import SearchBar from "./SearchBar";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProfile } from "../Account/reducer";

export default function Header() {
  const { profile } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const signOutEvent = () => {
    dispatch(setCurrentProfile(null));
  }

  return (
    <header className="flex-shrink-0 text-white p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">Spotify Playlister</h1>

        {/* Navigation Links */}
        {/* <div className="flex gap-10 absolute left-1/2 transform -translate-x-1/2">
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
        </div> */}

        <div>
          {!profile ? (
            <div className="flex items-center">
              <a href="https://www.spotify.com/us/signup" target="_blank" rel="noopener noreferrer" className="mr-3 lg:mr-6 text-sm md:text-lg lg:text-xl" title="Sign up for spotify">
                Sign up
              </a>
              <a
                href="http://localhost:5000/auth/login"
                className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm md:text-xl lg:text-2xl !text-[#000] font-semibold rounded-full transition duration-200" title="Login to spotify"
              >
                Login
              </a>
            </div>
          ) : (
            <button
              onClick={() => signOutEvent()}
              className="inline-block py-2 px-4 bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] text-sm !text-[#000] font-semibold rounded-full transition duration-200" title="Sign out of spotify"
            >
              Sign out
            </button>
            // <button className="rounded-full bg-black w-12 h-12 overflow-hidden flex flex-wrap justify-center content-center">
            //   {profile.images ? (
            //     <img src={profile.images[0].url} alt={`profile`} className="w-9 h-9 rounded-full" />
            //   ) : (
            //     <span className="text-gray-800 w-10 h-10">{profile.display_name.charAt(0)}</span>
            //   )}
            // </button>
          )}
        </div>
      </nav>
    </header>
  );
};
