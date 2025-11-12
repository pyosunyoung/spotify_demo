import { getCurrentUserPlaylistsRequest, getCurrentUserPlaylistsResponse } from "../models/playlist"
import api from "../utils/api"

const getCurrentUserPlaylists= async({limit, offset}:getCurrentUserPlaylistsRequest):Promise<getCurrentUserPlaylistsResponse>=>{
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