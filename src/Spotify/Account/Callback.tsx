import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCurrentProfile } from './reducer';
import { getUserProfile } from './client';

export default function Callback() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const success = searchParams.get('success');
            const successful = success && success === 'true';
            if (successful) {
                const response = await getUserProfile();

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
