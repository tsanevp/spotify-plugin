interface UserProfile {
    country?: string;
    display_name?: string;
    email?: string;
    explicit_content?: ExplicitContent;
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    images: Image[];
    product?: string;
    type?: string;
    uri?: string;
}

interface UsersPlaylists  {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedPlaylistObject[];
}

interface SimplifiedPlaylistObject {
    collaborative?: boolean;
    description?: string;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean | null;
    snapshot_id?: string;
    tracks?: Tracks;
    type?: string;
    uri?: string;
};

interface ExplicitContent {
    filter_enabled?: boolean;
    filter_locked?: boolean;
}

interface Followers {
    href?: null;
    total?: number;
}
interface Image {
    url: string;
    height: number | null;
    width: number | null;
}

interface Owner {
    external_urls: ExternalUrls;
    followers?: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name?: string | null;
}

interface Tracks {
    href?: string;
    total?: number;
}
interface ExternalUrls {
    spotify: string;
}

interface Track {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistTrackObject[];
}

interface PlaylistTrackObject {
    added_at?: string;
    added_by?: AddedBy;
    is_local?: boolean;
    track: TrackObject | EpisodeObject;
    playlistName?: string;
    playlistId?: string;
    selected?: boolean;
}

interface TrackObject {
    album?: Album;
    artists?: SimplifiedArtistObject[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: ExternalIds;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: object;
    restrictions?: Restrictions;
    name?: string;
    popularity?: number;
    preview_url: string | null;
    track_number?: number;
    type?: 'track';
    uri?: string;
    is_local?: boolean;
}

interface Album {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    restrictions?: Restrictions;
    type: 'album';
    uri: string;
    artists: SimplifiedArtistObject[];
}

interface SimplifiedArtistObject {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    name?: string;
    type?: 'artist';
    uri?: string;
}

interface Restrictions {
    reason: 'market' | 'product' | 'explicit';
}

interface EpisodeObject {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image;
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: ResumePoint;
    restrictions?: Restrictions;
    show: Show;
    type: 'episode';
    uri: string;
}

interface Show {
    available_markets: string[];
    copyrights: CopyrightObject[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean | null;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: 'show';
    uri: string;
    total_episodes: number;
}

interface CopyrightObject {
    text?: string;
    type: 'C' | 'P';
}

interface ResumePoint {
    fully_played?: boolean;
    resume_position_ms?: number;
}

interface ExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}

interface AddedBy {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
}