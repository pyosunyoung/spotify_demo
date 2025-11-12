import { getCurrentUserPlaylistsRequest, getCurrentUserPlaylistsResponse, getPlaylistRequest, Playlist } from "../models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists= async({limit, offset}:getCurrentUserPlaylistsRequest):Promise<getCurrentUserPlaylistsResponse>=>{
    try{
        const response = await api.get(`/me/playlists`, {
            params:{limit, offset},
        })
        console.log(response.data);
        return response.data;
        
    }catch(error){
        throw new Error("fail to fetch current user playlists")
    }
}
export default getCurrentUserPlaylists

export const getPlaylist = async(params:getPlaylistRequest):Promise<Playlist> => {
    try{
        const response = await api.get(`/playlists/${params.playlist_id}`,{
            params,
        });
        return response.data;
    }catch(error){
        throw new Error("fail into fetch playlist detail")
    }
}