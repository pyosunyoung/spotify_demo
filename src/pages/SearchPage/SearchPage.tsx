import React, { useEffect, useState } from "react";
import useGetSeveralBrowseCategories from "../../hooks/useGetSeveralBrowseCategories";
import { Grid, Typography, styled, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CategoryObject } from "../../models/category";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import SearchResultPage from "./components/SearchResultPage";

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
    marginBottom: "32px",
    "& .MuiInputBase-root": {
        borderRadius: "8px",
        backgroundColor: theme.palette.grey[900],
        color: "white",
    },
    "& .MuiOutlinedInput-root fieldset": {
        borderColor: "transparent",
    },
}));

// 랜덤 배경색 팔레트 (Spotify 스타일 기준)
const COLORS = [
    "#1db954", "#e91e63", "#ff9800", "#3f51b5", "#00bcd4",
    "#8bc34a", "#ff5722", "#9c27b0", "#4caf50", "#03a9f4",
];

const CategoryCard = styled(Box)(({ theme }) => ({
    position: "relative",
    borderRadius: "16px",
    padding: "20px",
    height: "350px",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    cursor: "pointer",
    transition: "transform 0.25s ease",
    "&:hover": {
        transform: "scale(1.03)",
    },
}));

const CategoryCenterText = styled("div")(() => ({
    position: "absolute",
    top: "45%",        // 약간 위쪽 (Spotify 느낌)
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "40px",
    fontWeight: 900,
    pointerEvents: "none", // 클릭 막지 않음
    opacity: 0.9,
    whiteSpace: "nowrap",
}));

const CategoryImage = styled("img")(() => ({
    position: "absolute",
    bottom: "-20px",
    right: "-20px",
    width: "220px",
    height: "220px",
    objectFit: "cover",
    transform: "rotate(15deg)",
    opacity: 0.85,
}));

const SearchPage = () => {
    const { data } = useGetSeveralBrowseCategories({ limit: 25, offset: 0 });
    const categories = data?.pages?.[0]?.categories?.items || [];
    console.log("category data", data);
    

    const [keyword, setKeyword] = useState<string>("");
    const { data:searchData, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album] // enum 가져와서 활용, 복수 가능
    });
    console.log("searchData", data);
    const tracks = searchData?.pages[0]?.tracks?.items ?? []; //널 병합 연산자라고 불립니다. 이 연산자는 왼쪽의 값이 null 또는 undefined일 때 오른쪽의 값을 반환하고, 그렇지 않으면 왼쪽의 값을 반환합니다.
    const albums = searchData?.pages[0]?.albums?.items ?? [];
    const artists = searchData?.pages[0]?.artists?.items ?? [];
    // const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? []; 
    const hasTracksResults = tracks.length > 0;
    const hasAlbumsResults = albums.length > 0;
    const hasArtistsResults = artists.length > 0;
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => { // 기존 event는 오류 나기 떄문에 타입 지정해줘야 함.
        setKeyword(event.target.value);
    }

    return (
        <SearchContainer>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "white" }}>
                Browse all
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
            <div>
                {isLoading ? (
                    <LoadingSpinner /> // 로딩 중일 때 스피너 표시
                ) : hasTracksResults || hasAlbumsResults || hasArtistsResults ? (
                    <SearchResultPage// nextpage관련 속성 추가 
                        tracklist={tracks}
                        albumlist = {albums}
                        artistlist ={artists}
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
            <Grid container spacing={3}>
                {categories.map((cat: CategoryObject) => {
                    const bgColor = COLORS[Math.floor(Math.random() * COLORS.length)];
                    const img = cat.icons?.[0]?.url;

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.id}>
                            <CategoryCard bgcolor={bgColor}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                                    {cat.name}
                                </Typography>
                                {/* <CategoryCenterText>{cat.name}</CategoryCenterText> */}
                                {img && <CategoryImage src={img} alt={cat.name} />}
                            </CategoryCard>
                        </Grid>
                    );
                })}
            </Grid>

        </SearchContainer>
    );
};

export default SearchPage;
