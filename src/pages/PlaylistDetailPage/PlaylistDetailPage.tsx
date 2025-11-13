import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  styled,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DefaultImage from "../../common/components/DefaultImage";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import LoginButton from "../../common/components/LoginButton";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
const LoaderContainer = styled(Box)(() => ({
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// 🧩 스크롤 가능한 트랙 리스트 컨테이너
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

// 메인 컴포넌트
const PlaylistDetailPage = () => {
  const { ref, inView } = useInView();
  //ref 감시할 DOM 요소에 연결하는 참조, inView : 해당 요소가 화면에 보이는지 여부(boolean)
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist, isLoading, error: playlistError } = useGetPlaylist({ playlist_id: id });
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  console.log("playListItems data", playlistItems);

  
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  if (isPlaylistItemsLoading || !playlist)
    return (
      <LoaderContainer>
        <LoadingSpinner />
      </LoaderContainer>
    );
    
//  //  에러 처리 (401 포함) !! 수정 필요 error 참조 에러
// if (error || playlistError) {
//   if (error?.error.status === 401) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         height="100%"
//         flexDirection="column"
//       >
//         <Typography variant="h2" fontWeight={700} mb="20px">
//           다시 로그인 하세요
//         </Typography>
//         <LoginButton />
//       </Box>
//     );
//   }

//   return <ErrorMessage errorMessage="Failed to load" />;
// }


  return (

    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ sm: 12, md: 10 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playlist?.tracks?.total === 0 ? <Typography>써치</Typography> : <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow >

        </TableHead>
        <TableBody>
          {playlistItems?.pages.map((page, pageIndex) =>
            page.items.map((item, itemIndex) => {
              return <DesktopPlaylistItem //이건 데스크탑 버전, 모바일 버전도 필요요
                item={item}
                key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                index={pageIndex * PAGE_LIMIT + itemIndex + 1} /> //첫번쨰 페이지에서는 인덱스 1,2,3,4 두번째 페이지는 인덱스 11 12 13 이렇게 들가기떄문문
            })
          )}
          <TableRow sx={{ height: "5px" }} ref={ref} />
          {isFetchingNextPage && <LoadingSpinner />}
        </TableBody>
      </Table>}
      
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
