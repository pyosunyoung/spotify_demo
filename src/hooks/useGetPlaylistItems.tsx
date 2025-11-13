import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { GetPlaylistItemsRequest } from '../models/playlist'
import { getPlaylistItems } from '../apis/playlistApi'

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlist-itmes', params], //params는 키값으로 들어감감
        queryFn: ({ pageParam }) => {
            return getPlaylistItems({ offset: pageParam, ...params });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next)
                const nextOffset = url.searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset) : undefined
            }
            return undefined

        }
    })
}
export default useGetPlaylistItems