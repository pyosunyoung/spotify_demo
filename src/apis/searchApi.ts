import axios from "axios"
import { SPOTIFY_BASE_URL } from "../configs/commonConfig"

const searchItemsByKeyword = async(token, params) => {
    try{
        const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json",
            }
        })
        return response.data;
    }catch(error){
        throw new Error("fail to search by keyword")
    }
}

//여기선 유틸 api안쓰고 axios를 쓰는 이유
//search는 따로 auth 즉 인증과정이 필요가 없음
//그래서 로그인 안해도 search가 가능함. 그래서 사용.
//로그인 안한상태, 로그인 한상태 둘다 SEARCH가 가능해야해서 API말고 AXIOS를 사용해야함.
//대신 토큰을 받아옴옴