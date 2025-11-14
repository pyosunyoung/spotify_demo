import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultlist from './SearchResultlist';

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const {data, error, isLoading} = useSearchItemsByKeyword({
        q:keyword,
        type: [SEARCH_TYPE.Track] // enum 가져와서 활용, 복수 가능능
    });
    console.log("searchData", data);
    const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => { // 기존 event는 오류 나기 떄문에 타입 지정해줘야 함.
        setKeyword(event.target.value);
    }
    return ( //my => margin y 이거 줄임말말
        <div>
            <Typography variant='h1' my="10px">
                Let's find something for your playlist
            </Typography>
            <TextField value={keyword} onChange={handleSearchKeyword} />
            {data?.pages.map((item) => {
                if(!item.tracks) return false
                return <SearchResultlist list={item.tracks?.items}></SearchResultlist>
            })} 
        </div>
    )//track undefined 상황 오류 해결
}

export default EmptyPlaylistWithSearch