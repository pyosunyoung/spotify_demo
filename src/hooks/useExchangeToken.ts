import { useMutation, useQueryClient } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
    //useMutation<응답값 타입, 에러 타입, mutation 함수 파라미터 값>
    //useMutation은 이렇게 타입을 미리 지정해줘야함. 응답값 타입은 공식 문서에 나와있음
    const queryClient = useQueryClient()
    return useMutation<ExchangeTokenResponse, Error, {code:string; codeVerifier:string}>({ 
        mutationFn:({code, codeVerifier}) => exchangeToken(code, codeVerifier),
        onSuccess:(data) => {
            localStorage.setItem('access_token', data.access_token);
            queryClient.invalidateQueries({
                queryKey:["current-user-profile"]
            })
        },
    })
}

// queryClient: React Query가 관리하는 캐시 관리자

// invalidateQueries: 특정 쿼리의 캐시를 유효하지 않은 상태로 표시

// queryKey: ["current-user-profile"]:
// 이 키로 캐시된 데이터를 찾아서 유효하지 않음 상태로 변경

//"current-user-profile"이라는 키로 캐싱되어 있는 데이터를 
// 무효화(invalidate)해서 다시 서버에서 새로 가져오도록 한다" 는 뜻.
//서버에서 최신 사용자 프로필 데이터를 다시 불러오도록 하는 코드.
export default useExchangeToken;