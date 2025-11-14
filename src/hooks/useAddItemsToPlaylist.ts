import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddItemsToPlaylistRequest } from "../models/playlist"
import { addItemsToPlaylist } from "../apis/playlistApi"

export const useAddItemsToPlaylist = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params:AddItemsToPlaylistRequest) => {
            return addItemsToPlaylist(params)
        },
        onSuccess:()=>{ // 플레이 리스트 아이템 추가 후 refetch
            queryClient.invalidateQueries({queryKey:["current-user-playlists"]})
            queryClient.invalidateQueries({queryKey:["playlist-detail"]})
            queryClient.invalidateQueries({queryKey:["playlist-itmes"]})
            console.log("성공");
        }
    })
}