import { CategoryDetailRequestParams, CategoryDetailResponse, CategoryPlaylistsRequestParmas, CategoryPlaylistsResponse, CategoryRequestParams, CategoryResponse } from "../models/category";
import { CategoryPlaylists } from "../models/categoryPlaylists";
import api from "../utils/api";

export const getServeralBrowseCategories = async ({limit , offset}: CategoryRequestParams):Promise<CategoryResponse> => {
    try{
        const response = await api.get(`/browse/categories`, {
            params: { limit, offset },
        })
        console.log("카테고리 데이터", response.data);
        return response.data;
        
    }catch(error){
        throw new Error("fail to Category")
    }
}

export const getSingleBrowseCategory = async(params: CategoryDetailRequestParams):Promise<CategoryDetailResponse> => {
    try{
        const category_id = params.category_id;
        const response = await api.get(`/browse/categories/${category_id}`, {
            params
        })
        console.log("카테고리 디테일 데이터", response.data)
        return response.data;
    }catch(error){
        throw new Error("fail to CategoryDetail");
    }

}


//사용중지 api ;;
export const getCategoryPlaylists = async(params:CategoryPlaylistsRequestParmas):Promise<CategoryPlaylistsResponse> => {
    try{   
        const { category_id, limit, offset } = params;
        const response = await api.get(`/browse/categories/${category_id}/playlists`,{
            params: {
                offset,
                limit,
                
              }
        })
        console.log("카테고리 플레이리스트 데이터", response.data);
        return response.data

    }catch(error){
        throw new Error("fail to CategoryPlaylist")
    }
}

