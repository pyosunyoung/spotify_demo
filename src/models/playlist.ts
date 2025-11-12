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
// export type getPlaylistResponse = ApiResponse