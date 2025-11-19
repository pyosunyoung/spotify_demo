import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getAlbum } from "../apis/albumApi";


const useGetAlbum = (ids: string) => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ['get-Album', ids], // querykey의 ID 역할
        queryFn: async () => {
            if (!clientCredentialToken) { // 토큰 undefined일시 에러처리
                throw new Error("No token available")
            }
            return getAlbum(clientCredentialToken, { ids }); // 데이터를 가져오는 함수
        },
        enabled: !!ids,
    })
}
export default useGetAlbum;