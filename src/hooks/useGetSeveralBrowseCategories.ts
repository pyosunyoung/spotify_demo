import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { getServeralBrowseCategories } from '../apis/categoryApi';
import { CategoryRequestParams } from '../models/category';

const useGetSeveralBrowseCategories = ({limit, offset}:CategoryRequestParams) => {
    return useInfiniteQuery({
        queryKey:['get-categories'],
        queryFn: ({pageParam = 0}) => {
            return getServeralBrowseCategories({limit, offset : pageParam});
        },
        initialPageParam : 0,
        getNextPageParam:(lastPage)=>{
            //이것의 리턴값이 pageParma으로 가서 offset에 삽입됨
            if(lastPage.next){
                const url = new URL(lastPage.next)
                const nextOffset = url.searchParams.get("offset")
                return nextOffset ? parseInt(nextOffset):undefined  //offset값이 int와 값이 없다면 undefined
            } 
            return undefined;
        }
    })
}

export default useGetSeveralBrowseCategories