import { Box, InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultlist from './SearchResultlist';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import SearchResultList from './SearchResultlist';
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled(Box)({ // 스크롤 디자인 
    padding: "16px",
    width: "100%",
    height: "100%",
    overflowY: "auto",

    "&::-webkit-scrollbar": {
        display: "none",
    },
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",

    "& .MuiInputBase-root": {
        borderRadius: "4px", // 입력 필드의 둥근 모서리
        backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
        color: "white", // 텍스트 색상
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "transparent", // 테두리 색상 제거
        },
        "&:hover fieldset": {
            borderColor: "gray", // 마우스 호버 시 테두리 색상
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray", // 포커스 시 테두리 색상
        },
    },
}));

const EmptyPlaylistWithSearch = () => {
    const [keyword, setKeyword] = useState<string>("");
    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track] // enum 가져와서 활용, 복수 가능
    });
    console.log("searchData", data);
    const tracks = data?.pages[0]?.tracks?.items ?? []; //널 병합 연산자라고 불립니다. 이 연산자는 왼쪽의 값이 null 또는 undefined일 때 오른쪽의 값을 반환하고, 그렇지 않으면 왼쪽의 값을 반환합니다.
    // const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? []; 
    const hasResults = tracks.length > 0;
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => { // 기존 event는 오류 나기 떄문에 타입 지정해줘야 함.
        setKeyword(event.target.value);
    }
    return ( //my => margin y 이거 줄임말
        <SearchContainer>
            <Box display="inline-block">
                <Typography variant="h1" my="10px">
                    Let's find something for your playlist
                </Typography>

                <StyledTextField
                    value={keyword}
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Search for songs or episodes"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: "white" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={handleSearchKeyword}
                />
            </Box>
            <div>
                {isLoading ? (
                    <LoadingSpinner /> // 로딩 중일 때 스피너 표시
                ) : hasResults ? (
                    <SearchResultList // nextpage관련 속성 추가 
                        list={tracks}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                        fetchNextPage={fetchNextPage}
                    />
                ) : keyword === "" ? (
                    <></> // 검색어가 없을 때는 아무것도 표시하지 않음
                ) : (
                    <div>{`No Result for "${keyword}"`}</div> // 검색 결과가 없을 때만 표시
                )}
            </div>
        </SearchContainer>
    )//track undefined 상황 오류 해결
}

export default EmptyPlaylistWithSearch