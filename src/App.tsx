import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Spotify/HomePage';
import Profile from './Spotify/Profile';
import CreatePlaylist from './Spotify/CreatePlaylist';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}