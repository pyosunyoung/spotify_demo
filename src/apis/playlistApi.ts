import { CreatePlaylistRequest, getCurrentUserPlaylistsRequest, getCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, getPlaylistRequest, Playlist } from "../models/playlist"
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

export const getPlaylistItems=async(params:GetPlaylistItemsRequest):Promise<GetPlaylistItemsResponse>=>{
    try{
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`,{
            params,
        });
        return response.data
    }catch(error){
        throw new Error("fail to fetch playlist items")
    }
}

export const createPlaylist = async(user_id:string, params:CreatePlaylistRequest):Promise<Playlist>=>{ //params body
    try{
        const {name, playlistPublic, collaboratvie, description} = params;
        const response = await api.post(`/users/${user_id}/playlists`,{
            name,
            public : playlistPublic,
            collaboratvie,
            description
        });
        return response.data;
    }catch(error){
        throw new Error("fail to create playlist")
    }
}