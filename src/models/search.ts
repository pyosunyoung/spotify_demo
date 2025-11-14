import { ApiResponse } from "./apiResponse";
import { Artist } from "./artists";
import { SimplifiedPlaylist } from "./playlist";
import { SimplifiedAlbum, SimplifiedAudioBook, SimplifiedEpisode, SimplifiedShow, Track } from "./track";

export const enum SEARCH_TYPE{
    Track="track",
    Album="album",
    Playlist="playlist",
    Show = "show",
    Episode = "episode",
    AudioBook = "audiobook",
    Artist = "artist",
}

export interface SearchRequestParmas {
    q:string;
    type:string[];
    market?: string;
    limit? : number;
    offset?: number;
    include_external?: string;

}

export interface SearchResponse{
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    tracks?: ApiResponse<Track>;
    playlists?: ApiResponse<SimplifiedPlaylist>;
    shows?:ApiResponse<SimplifiedShow>;
    episodes?:ApiResponse<SimplifiedEpisode>;
    audiobooks? : ApiResponse<SimplifiedAudioBook>;
}