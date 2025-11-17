import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { CategoryDetailRequestParams } from '../models/category'
import { getSingleBrowseCategory } from '../apis/categoryApi'

const useGetSingleBrowseCategory = (params:CategoryDetailRequestParams) => {
    
  return useQuery({
    queryKey : [`get-detailCategory`, params.category_id],
    queryFn : () => {
        return getSingleBrowseCategory(params)
    },
    enabled: !!params.category_id
    ,
  })
}

export default useGetSingleBrowseCategory