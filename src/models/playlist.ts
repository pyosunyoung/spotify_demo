import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";

export interface getCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type getCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>
//interface는 객체 형태기 떄문에 키값이 필요함 하지만 이건 키값이 필요없이 즉시 데이터 반환이라
//type으로 써줌.

export interface SimplifiedPlaylist extends BasePlaylist {

    tracks?: {
        href?: string;
        total?: number;
    };
    
}

export interface Playlist extends BasePlaylist{
    tracks:ApiResponse<PlaylistTrack>;
    followers: Followers
}
//위 simplifiedPlaylist와 구조가 비슷함
//그래서 Base타입을 만들어서 재사용성 상승 시키자.

//simplifiedPlayList tracks
// Playlist tracks followers

export interface BasePlaylist{
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[]; // 0~3개 이미지
    name?: string;
    owner: Owner;
    public?: boolean | null;
    snapshot_id?: string;
    type?: "playlist";
    uri?: string;
}

export interface getPlaylistRequest {
    playlist_id:string;
    market?: string;
    fields?: string;
    additional_types?: string;
}
export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
      external_urls?: ExternalUrls;
      followers?: Followers;
      href?: string;
      id?: string;
      type?: string;
      uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}



// 공통 타입 (이미 정의되어 있다면 중복 정의 생략 가능)
  
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
    album: SimplifiedAlbum;
    artists: SimplifiedArtist[];
    available_markets?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids?: ExternalIds;
    external_urls?: ExternalUrls;
    href: string;
    id: string;
    is_playable?: boolean;
    linked_from?: TrackLinkedFrom;
    restrictions?: Restrictions;
    name: string;
    popularity: number;
    preview_url?: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
  }
  
  // linked_from (relinked track 관련)
  export interface TrackLinkedFrom { //보류류
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  }
  

// Episode (PlaylistTrack.track의 두 번째 타입)
export interface Episode {
    audio_preview_url?: string | null; // Deprecated
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
    language?: string; // Deprecated
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
  
  // ✅ ResumePoint (사용자 재생 위치)
  export interface ResumePoint {
    fully_played: boolean;
    resume_position_ms: number;
  }
  
  // ✅ SimplifiedShow (Episode이 속한 Show 정보)
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
  
  // Copyright (쇼의 저작권 정보)
  export interface Copyright {
    text: string;
    type: "C" | "P" | string; // C = 저작권, P = 음원 저작권
  }
  