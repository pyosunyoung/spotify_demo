import { ApiResponse } from "./apiResponse";
import { Artist } from "./artists";
import { ExternalUrls, Image } from "./commonType";
import { Copyright, ExternalIds, Track } from "./track";

export interface getNewReleasesResponse {
    albums: ApiResponse<SimplifiedAlbum>;
}

export interface SimplifiedAlbum {
    album_type: string;
    total_tracks: string;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
        reason?: string;
    },
    type: string;
    url: string;
    artists: Artist[];
}

export interface SimplifiedAlbumResponse {
    album_type: string;
    total_tracks: string;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: {
        reason?: string;
    },
    type: string;
    url: string;
    artists: Artist[];
    track:Track;
    copyrights:Copyright[];
    external_ids: ExternalIds;
    label: string;
    popularity:number;
}
export interface getAlbumsRequest {
    ids: string; // "id1,id2,id3,id4,id5,id6"
  }

export interface getAlbumResponse{
    albums: SimplifiedAlbumResponse[],
} 

export interface getAlbumTracksRequest{
    ids: string; 
    market?: string;
    limit?:number;
    offset?:number;
}

// export type getAlbumTracksResponse = ApiResponse<Track>;

export interface getAlbumTracksResponse {
    tracks: Track[];
  }