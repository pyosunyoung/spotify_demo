export interface getNewReleasesResponse {
    albums:{
        href:string;
        limit:number;
        next:string;
        offset:number;
        previous:string | null;
        total:number;
        items:{
            album_type: string;
            total_tracks: string;
            available_markets: string[];
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            images: {
                url: string;
                height: number | null;
                width: number | null;
            }[];
            name: string;
            release_date: string;
            release_date_precision: string;
            restrictions?:{
                reason?: string;
            },
            type: string;
            url: string;
            artists: {
                external_urls?:{
                    spotify: string;
                };
                href?: string;
                id?: string;
                name?: string;
                type?: string;
                uri?: string;
            }[];
        }[];
    };
}