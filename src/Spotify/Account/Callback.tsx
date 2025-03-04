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
      const success = searchParams.get('success');
      const successful = success && success === 'true';
        console.log(success);
      if (successful) {
        let response = await fetch('http://localhost:5000/user/profile', {
          method: 'GET',
          credentials: 'include'
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
