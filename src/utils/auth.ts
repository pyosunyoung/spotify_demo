import { CLIENT_ID } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto"

export const getSpotifyAuthUrl = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;

    const scope = 'user-read-private user-read-email'; //얼마나 많은 허가가 필요한지?
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);
    ////이 두개는 반드시 있어야함 근데 에러로 string | undefined 요구해서 이렇게 조건식 달아줌
    if (clientId && redirectUri) { 
        const params: AuthUrlParams = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }
        authUrl.search = new URLSearchParams(Object.entries(params)).toString(); // params 매개변수 타입 지정해줘야 에러 해결결
        window.location.href = authUrl.toString(); // spotify 로그인 주소를 열 수 있음.
    };

}