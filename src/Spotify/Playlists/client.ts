const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const PLAYLIST_API = `${REMOTE_SERVER}/user/playlists`

export const createPlaylist = async (body: any, profileId: string) => {
    const response = await fetch(`${REMOTE_SERVER}/user/${profileId}/playlists/create`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        return false;
    }

    return response.json();
};

export const getUserPlaylists = async () => {
    console.log(PLAYLIST_API);
    const response = await fetch(PLAYLIST_API, {
        method: "GET",
        credentials: 'include'
    });

    if (!response.ok) {
        return false;
    }

    return response.json();
};

export const getPlaylistTracks = async (playlistId: string, offset: number) => {
    let url = `${PLAYLIST_API}/${playlistId}/tracks?offset=${offset}&limit=100`;
    const response = await fetch(url, {
        method: "GET",
        credentials: 'include'
    });

    if (!response.ok) {
        return false;
    }

    return response.json();
};