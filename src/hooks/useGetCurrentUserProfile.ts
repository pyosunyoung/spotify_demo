import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCurrentUserProfile } from "../apis/userApi"
import { User } from "../models/user"

const useGetCurrentUserProfile = ():UseQueryResult<User,Error> => {
    const accessToken = localStorage.getItem("access_token")
    return useQuery({
        queryKey: ['current-user-profile'],
        queryFn: getCurrentUserProfile,
        enabled: !!accessToken, // accessToken이 있어야만 실행한다.
    })
}

export default useGetCurrentUserProfile;