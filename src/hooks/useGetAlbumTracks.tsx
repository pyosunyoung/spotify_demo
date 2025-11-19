import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getAlbumTracks } from "../apis/albumApi";
import { getAlbumTracksRequest, getAlbumTracksResponse } from "../models/album";



const useGetAlbumTracks = (params:getAlbumTracksRequest): UseQueryResult<getAlbumTracksResponse, Error> => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ['get-Album-Tracks', params.ids, params.limit, params.offset], // querykey의 ID 역할
        queryFn: async () => {
            if (!clientCredentialToken) { // 토큰 undefined일시 에러처리
                throw new Error("No token available")
            }
            return getAlbumTracks(clientCredentialToken, params); // 데이터를 가져오는 함수
        },
        enabled: !!params.ids, // id 없으면 호출하지 않음
    })
}
export default useGetAlbumTracks;