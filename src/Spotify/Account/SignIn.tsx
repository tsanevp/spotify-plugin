import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSpotify } from "react-icons/fa";
import { useEffect } from 'react';

export default function SignIn() {
  const navigate = useNavigate();
  const { profile } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (profile) {
      navigate('/');
    }
  }, []);

  return (
    <div id="container" className="flex justify-center h-full py-24 gap-3 bg-[#000] text-white select-none">
      <div className="w-1/3 flex flex-col justify-center items-center border rounded bg-[#121212] ">
        <FaSpotify size={40} />
        <h1 className='text-2xl font-bold mt-3'>Login to Spotify</h1>
        <p className='text-md text-[var(--text-subdued)] mt-1'>This will redirect you to the official Spotify website</p>
        <a href="http://localhost:5000/auth/login" className="mt-6 !text-[#000] !font-bold bg-[var(--text-positive)] hover:bg-[var(--text-positive-hover)] focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Log in
        </a>
      </div>
    </div>
  )
}
