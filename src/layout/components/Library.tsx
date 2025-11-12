import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage, // 다음 페이지 데이터터
    hasNextPage, // 다음 페이지가 있나요?
    isFetchingNextPage, // 페이지를 가져오고 있나요?
    isLoading,
    error,
  } = useGetCurrentUserPlaylists({ limit: 15, offset: 0 });

  console.log("data", data);

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView])

  if (!user) return <EmptyPlaylist />

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      {!data || data?.pages[0].total === 0 ? ( // 플레이 리스트가 없다면?
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => (
            <Playlist playlists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner/>}</div>


        </PlaylistContainer>
      )}
    </div> //ref에 도착해야 데이터가 가져와짐짐
  );
};

export default Library;

