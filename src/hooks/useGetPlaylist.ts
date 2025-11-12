import { useQuery } from "@tanstack/react-query"
import { getPlaylistRequest } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params:getPlaylistRequest) => {
    return useQuery({
        queryKey:['playlist-detail', params.playlist_id],
        queryFn:()=>{
            return getPlaylist(params);
        },
        enabled: !!params.playlist_id, //params.playlist_id가 있다면 호출출
    })
}

export default useGetPlaylist;