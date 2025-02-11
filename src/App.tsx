import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Profile from './Profile';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}