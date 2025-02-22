import '../App.css'
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function fetchProfile(): Promise<UserProfile> {
    const response = await fetch("http://localhost:5000/user/profile", {
      method: "GET"
    });
    
    return await response.json();
  }

  async function fetchPlaylists() {
    const response = await fetch("http://localhost:5000/user/playlists", {
      method: "GET"
    });

    console.log(await response.json());

  }

  useEffect(() => {
    const fetchData = async () => {
      if (access_token && typeof (access_token) == 'string') {
        let profile = await fetchProfile();
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
        <button onClick={fetchPlaylists}>get</button>
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
