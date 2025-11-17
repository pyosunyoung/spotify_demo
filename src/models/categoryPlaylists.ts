// models/categoryPlaylists.ts

export interface Image {
    url: string;
    height: number | null;
    width: number | null;
  }
  
  export interface ExternalUrls {
    spotify: string;
  }
  
  export interface PlaylistOwner {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name: string | null;
  }
  
  export interface TracksInfo {
    href: string;
    total: number;
  }
  
  export interface SimplifiedPlaylistObject {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: PlaylistOwner;
    public: boolean | null;
    snapshot_id: string;
    tracks: TracksInfo;
    type: "playlist";
    uri: string;
  }
  
  export interface CategoryPlaylists {
    message?: string;
    playlists: {
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
      items: SimplifiedPlaylistObject[];
    };
  }