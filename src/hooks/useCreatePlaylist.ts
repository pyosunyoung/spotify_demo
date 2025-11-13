import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile"
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const {data:user} = useGetCurrentUserProfile();
    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (user?.id) { // 여긴 user.id
                return createPlaylist(user.id, params);
            }
            return Promise.reject(new Error("user is not defined"));
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["current-user-playlists"]})
            console.log("성공");
        }
    });
    
}

export default useCreatePlaylist;

// mutationFn:(params: CreatePlaylistRequest)=>{
//     return createPlaylist(user?.id, params) // undefined도 나올 수 있다? 에러 해결
// }

// 'string | undefined' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
//   'undefined' 형식은 'string' 형식에 할당할 수 없습니다.ts(2345) 위 에러 해결결