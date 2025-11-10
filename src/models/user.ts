import { ExplicitContent, ExternalUrls, Followers, Image } from "./commonType";

export interface User{ //스포티파이 user 공식문서 참고고
    country?: string;
    display_name?:string;
    email?:string;  
    explicit_content?:ExplicitContent;
    external_urls?:ExternalUrls;
    followers?: Followers;
    href?:string;
    id?:string;
    images:Image[];
    product?:string;
    type?:string;
    uri?:string;

}