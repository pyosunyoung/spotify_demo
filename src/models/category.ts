import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface CategoryRequestParams {
    locale?: string; // 언어어
    /**
     * Maximum number of items to return.
     * Default: 20, Min: 1, Max: 50
     */
    limit?: number;

    /**
     * Index of the first item to return.
     * Default: 0
     */
    offset?: number;
}


export interface CategoryObject {
    href: string;
    icons: Image[];
    id: string;
    name: string;
}

export type CategoryResponse = ApiResponse<CategoryObject>;


export interface CategoryDetailRequestParams {
    category_id : string;
    locale?: string; 
}

export type CategoryDetailResponse = CategoryObject;

export interface CategoryPlaylistsRequestParmas {
    category_id : string;
    limit? : number;
    offset? : number;
}

export interface CategoryPlaylistsResponse{
    message? : string;
    playlists? : CategoryPlaylistsObject;
}

export type CategoryPlaylistsObject = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject{
    collaboratvie? : boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean | null;
    snapshot_id?: string;
    tracks?: Tracks,
    type?: string;
    uri?: string;
}

export interface Tracks{
    href? : string;
    total? : number;
}


