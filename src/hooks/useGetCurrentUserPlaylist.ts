import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import getCurrentUserPlaylists from "../apis/playlistApi"
import { getCurrentUserPlaylistsRequest } from "../models/playlist"


const useGetCurrentUserPlaylists = ({limit, offset}: getCurrentUserPlaylistsRequest) => {
        return useInfiniteQuery({ // 무한 스크롤 로직직
            queryKey:["current-user-playlists"],
            queryFn:({pageParam = 0})=>{
                return getCurrentUserPlaylists({limit,offset:pageParam});
            },
            initialPageParam:0,
            getNextPageParam:(lastPage)=>{
                //이것의 리턴값이 pageParma으로 가서 offset에 삽입됨
                if(lastPage.next){
                    const url = new URL(lastPage.next)
                    const nextOffset = url.searchParams.get("offset")
                    return nextOffset ? parseInt(nextOffset):undefined  //offset값이 int와 값이 없다면 undefined
                } 
                return undefined;
            }
        })
    
}
//pageParma을 0으로 설정해주고 
//offset은 값이 계속 변해야 무한 스크롤이 가능함, 그래서 매개변수로 세팅팅

export default useGetCurrentUserPlaylists;