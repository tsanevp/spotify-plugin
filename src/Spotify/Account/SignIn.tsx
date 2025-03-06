import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSpotify } from "react-icons/fa";
import { useEffect } from 'react';

export default function SignIn() {
  const navigate = useNavigate();
  const { profile } = useSelector((state: any) => state.accountReducer);

  async function checkServerHealth() {
    try {
      const response = await fetch("http://localhost:5000/health", {
        method: "GET",
      });

      if (response.ok) {
        window.location.href = 'http://localhost:5000/auth/login';
      } else {
        console.error('Server is not live', response.status);
        alert('Server is currently unavailable. Please try again later.');
      }
    } catch (error) {
      console.error('Error checking server status:', error);
      alert('Server is currently unavailable. Please try again later.');
    }
  }

  useEffect(() => {
    if (profile) {
      navigate('/');
    }
  }, []);

  return (
    <div id="container" className="flex justify-center h-full py-24 gap-3 bg-[#000] text-white select-none">
      <div className="w-2/3 lg:w-1/3 flex flex-col justify-center text-center items-center border rounded bg-[#121212] px-3">
        <FaSpotify size={40} />
        <h1 className='text-xl md:text-2xl font-bold mt-3'>Login to Spotify</h1>
        <p className='text-sm md:text-base text-[var(--text-subdued)] mt-1'>This will redirect you to the official Spotify website</p>
        <button onClick={checkServerHealth} className="mt-6 !text-[#000] !font-bold bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Log in
        </button>
      </div>
    </div>
  )
}
