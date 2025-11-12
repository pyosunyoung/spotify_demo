import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface getCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type getCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>
//interface는 객체 형태기 떄문에 키값이 필요함 하지만 이건 키값이 필요없이 즉시 데이터 반환이라
//type으로 써줌.

export interface SimplifiedPlaylist {
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
    tracks?: {
        href?: string;
        total?: number;
    };
    type?: "playlist";
    uri?: string;
}

