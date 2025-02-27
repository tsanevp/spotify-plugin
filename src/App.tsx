import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Spotify/HomePage';
import Profile from './Spotify/Profile';
import CreatePlaylist from './Spotify/CreatePlaylist';
import Layout from './Spotify/Components/Layout';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}