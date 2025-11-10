import { useMutation } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
    //useMutation<응답값 타입, 에러 타입, mutation 함수 파라미터 값>
    //useMutation은 이렇게 타입을 미리 지정해줘야함. 응답값 타입은 공식 문서에 나와있음
    return useMutation<ExchangeTokenResponse, Error, {code:string; codeVerifier:string}>({ 
        mutationFn:({code, codeVerifier}) => exchangeToken(code, codeVerifier),
        onSuccess:(data) => {
            localStorage.setItem('access_token', data.access_token);
        }
    })
}

export default useExchangeToken;