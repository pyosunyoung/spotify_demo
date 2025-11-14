import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { SearchRequestParmas, SearchResponse } from "../models/search";

export const searchItemsByKeyword = async (token: string, params: SearchRequestParmas):Promise<SearchResponse> => {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append("q", params.q);
        searchParams.append("type", params.type.join(","));

        if (params.market) searchParams.append("market", params.market);
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.offset) searchParams.append("offset", params.offset.toString());
        if (params.include_external) searchParams.append("include_external", params.include_external);
        const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        return response.data;
    } catch (error) {
        throw new Error("fail to search by keyword")
    }
}

export default searchItemsByKeyword;
//여기선 유틸 api안쓰고 axios를 쓰는 이유
//search는 따로 auth 즉 인증과정이 필요가 없음
//그래서 로그인 안해도 search가 가능함. 그래서 사용.
//로그인 안한상태, 로그인 한상태 둘다 SEARCH가 가능해야해서 API말고 AXIOS를 사용해야함.
//대신 토큰을 받아옴옴