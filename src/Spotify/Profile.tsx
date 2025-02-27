import '../App.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { profile } = useSelector((state: any) => state.accountReducer);

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
            <li>Spotify URI: <a id="uri" href={profile?.external_urls?.spotify}>{profile.uri}</a></li>
            <li>Profile Image: {profile.images[0].url}</li>
          </ul>
        </section>
      }
    </>
  )
}
