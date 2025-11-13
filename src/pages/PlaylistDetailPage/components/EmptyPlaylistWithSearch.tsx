import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>) => { // 기존 event는 오류 나기 떄문에 타입 지정해줘야 함.
        setKeyword(event.target.value);
    }
    return ( //my => margin y 이거 줄임말말
        <div>
            <Typography variant='h1' my="10px">
                Let's find something for your playlist
            </Typography>
            <TextField value={keyword} onChange={handleSearchKeyword} />
        </div>
    )
}

export default EmptyPlaylistWithSearch