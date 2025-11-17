import React, { useEffect } from 'react'
import useGetSeveralBrowseCategories from '../../hooks/useGetSeveralBrowseCategories'
import useGetSingleBrowseCategory from '../../hooks/useGetSingleBrowseCategory';
import useGetCategoryPlaylists from '../../hooks/useGetCategoryPlaylists';
import { InputAdornment, styled, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

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

const SearchPage = () => {
  // const {data} = useGetSeveralBrowseCategories({limit: 25, offset: 0});
  // const {data} = useGetSingleBrowseCategory({category_id : "dinner"});
  // useQuery를 사용하도록 변경했으므로, 이 훅은 첫 페이지 데이터만 가져옵니다.
  const {data} = useGetCategoryPlaylists({category_id: "hiphop", limit: 25, offset: 0,})
  
  useEffect(()=>{
    // 이 data에는 playlists.items 배열과 페이지 정보가 없는 응답이 담겨 있을 것입니다.
    console.log("getCategories",data); 
  },[data])
  return (
    <div>
      <StyledTextField
                    // value={keyword}
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
                    // onChange={handleSearchKeyword}
                />
    </div>
  )
}

export default SearchPage