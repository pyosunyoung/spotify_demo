import { useQuery } from "@tanstack/react-query"
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
    const clientCredentialToken = useClientCredentialToken()
    return useQuery({
        queryKey: ['new-Releases'], // querykey의 ID 역할
        queryFn: async () => {
            if (!clientCredentialToken) { // 토큰 undefined일시 에러처리
                throw new Error("No token available")
            }
            return getNewReleases(clientCredentialToken); // 데이터를 가져오는 함수
        },
    })
}
export default useGetNewReleases;