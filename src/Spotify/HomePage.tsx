import '../App.css'

export default function HomePage() {
  return (
    <div className='flex flex-col'>
      <a href="http://localhost:5000/auth/login">Login to Spotify</a>
      <a href="/create-playlist">Create Playlist</a>
    </div>
  )
}
