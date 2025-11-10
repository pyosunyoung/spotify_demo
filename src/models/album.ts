import { Artist } from "./artists";
import { ExternalUrls, Image } from "./commonType";

export interface getNewReleasesResponse {
    albums:{
        href:string;
        limit:number;
        next:string;
        offset:number;
        previous:string | null;
        total:number;
        items: SimplifiedAlbum[];
    };
}

export interface SimplifiedAlbum{
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
            restrictions?:{
                reason?: string;
            },
            type: string;
            url: string;
            artists: Artist[];
}