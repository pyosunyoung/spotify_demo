import { useQuery } from '@tanstack/react-query' // 🚀 useInfiniteQuery -> useQuery로 변경
import React from 'react'
import { CategoryPlaylistsRequestParmas } from '../models/category';
import { getCategoryPlaylists } from '../apis/categoryApi';

const useGetCategoryPlaylists = (params:CategoryPlaylistsRequestParmas) => {
    // 1. useQuery로 변경하고, 무한 스크롤 관련 옵션 제거
    return useQuery({
        // 2. queryKey는 그대로 유지 (단, 페이지네이션 파라미터가 모두 포함되도록 변경 권장)
        // 현재는 단일 페이지이므로 offset: 0 을 명시적으로 포함하는 것이 좋습니다.
        queryKey: ["get-category-playlist", params.category_id, params.limit, 0], 
        
        // 3. queryFn을 일반적인 비동기 함수 형태로 변경
        // useInfiniteQuery에서 사용하던 {pageParam = 0} 구조를 제거합니다.
        queryFn: () => {
            return getCategoryPlaylists({
                limit: params.limit,
                offset: 0, // 첫 번째 페이지(offset: 0)만 고정적으로 요청
                category_id: params.category_id
            });
        },
        // useInfiniteQuery의 'initialPageParam' 및 'getNextPageParam' 옵션을 제거합니다.
    });
}

export default useGetCategoryPlaylists