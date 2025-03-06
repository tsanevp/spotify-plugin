import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './Spotify/HomePage';
import Profile from './Spotify/Profile';
import CreatePlaylist from './Spotify/CreatePlaylist';
import Layout from './Spotify/Components/Layout';
import SignIn from './Spotify/Account/SignIn';
import ProtectedRoute from './Spotify/Account/ProtectedRoute';
import Callback from './Spotify/Account/Callback';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public Routes */}
          <Route path="/callback" element={<Callback />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Protected Routes */}
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            index
            element={
              <ProtectedRoute>
                <CreatePlaylist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}