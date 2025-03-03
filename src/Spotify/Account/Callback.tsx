import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentProfile } from './reducer';

export default function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');

      if (access_token) {
        let response = await fetch('http://localhost:5000/user/profile', {
          method: 'GET',
        });

        if (response.ok) {
          const profile = await response.json();
          dispatch(setCurrentProfile(profile));
          navigate('/');
        } else {
          console.error('Failed to fetch profile');
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
    };

    fetchData();
  }, [dispatch, navigate, location]);

  return <div>Loading...</div>;
}
