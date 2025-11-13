import { ExternalUrls, Followers, Image, Owner } from "./commonType";

export interface Restrictions {
    reason?: "market" | "product" | "explicit" | string;
  }
  
  export interface ExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
  }
  
  // 아티스트 (간단 버전)
  export interface SimplifiedArtist {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    name: string;
    type?: "artist";
    uri?: string;
  }
  
  // 앨범
  export interface SimplifiedAlbum {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets?: string[];
    external_urls?: ExternalUrls;
    href: string;
    id: string;
    images?: Image[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: Restrictions;
    type: "album";
    uri: string;
    artists: SimplifiedArtist[];
  }
  
  // 트랙 본체
  export interface Track {
    album?: SimplifiedAlbum;
    artists?: SimplifiedArtist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: ExternalIds;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: Track;
    restrictions?: Restrictions;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: "track";
    uri?: string;
    is_local?: boolean;
  }


  // Episode (PlaylistTrack.track의 두 번째 타입)
export interface Episode {
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    resume_point?: ResumePoint;
    type: "episode";
    uri: string;
    restrictions?: Restrictions;
    show: SimplifiedShow;
  }
  

  export interface ResumePoint {
    fully_played: boolean;
    resume_position_ms: number;
  }
  

  export interface SimplifiedShow {
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
  }

  export interface Copyright {
    text: string;
    type: "C" | "P" | string; // C = 저작권, P = 음원 저작권
  }