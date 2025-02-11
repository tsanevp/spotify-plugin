import './App.css'
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function fetchProfile(token: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      if (access_token && typeof (access_token) == 'string') {
        let profile = await fetchProfile(access_token);
        console.log(profile);
        setProfile(profile);
      }
    }

    fetchData();
  }, [access_token]);

  return (
    <>
      <div className='flex flex-col justify-center'>
        <Link to="/">Go home</Link>
        <a href="http://localhost:5000/auth/login">Login to Spotify</a>
      </div>
      <h1>Display your Spotify profile data</h1>
      {!profile ? <div>Loading...</div> :
        <section id="profile" className='flex flex-col justify-center'>
          <h2>Logged in as {profile.display_name}</h2>
          <img src={profile.images[0].url} height={200} width={200} alt='profile pic of spotify account' />
          <ul>
            <li>User ID: {profile.id} </li>
            <li>Email: {profile.email} </li>
            <li>Spotify URI: <a id="uri" href={profile.external_urls.spotify}>{profile.uri}</a></li>
            <li>Profile Image: {profile.images[0].url}</li>
          </ul>
        </section>
      }
    </>
  )
}
