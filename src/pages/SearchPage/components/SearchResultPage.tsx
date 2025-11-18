import React, { useEffect } from "react";
import { Grid, Typography, styled, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { useInView } from "react-intersection-observer";


// ========================= Styled Components =========================


const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "white",
  fontWeight: 700,
  marginBottom: "16px",
}));

const TopResultContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[900],
  display: "flex",
  gap: "16px",
  alignItems: "center",
  transition: "0.3s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const AlbumImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
});

const CircleImage = styled("img")({
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  objectFit: "cover",
});

const CircleIconWrapper = styled(Box)(({ theme }) => ({
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[700],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CardContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const Overlay = styled("div")({
  position: "absolute",
  bottom: "20px",
  right: "12px",
  opacity: 0,
  transition: "0.3s",
});

const SongRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  padding: "8px 0",
  alignItems: "center",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .addButton": {
    opacity: 1,
  },
}));

const AddButton = styled(IconButton)(({ theme }) => ({
  opacity: 0,
  transition: "0.2s",
  color: theme.palette.grey[300],
}));

// ========================= Component =========================

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import PlayButton from "../../../common/components/PlayButton";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylist";
import { useAddItemsToPlaylist } from "../../../hooks/useAddItemsToPlaylist";

const SearchResultPage = ({ tracklist, albumlist, artistlist, hasNextPage, isFetchingNextPage, fetchNextPage, onAdd }) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (!tracklist || !albumlist || !artistlist) return <LoadingSpinner />;

  const topTrack = tracklist?.[0];

  // ===== Modal State =====
  const [open, setOpen] = React.useState(false);
  const [selectedSongId, setSelectedSongId] = React.useState(null);

  const { data: playlistData } = useGetCurrentUserPlaylists({ limit: 20, offset: 0 });
  const addToPlaylist = useAddItemsToPlaylist();

  const handleOpenModal = (songId) => {
    setSelectedSongId(songId);
    setOpen(true);
  };

  const handleSelectPlaylist = (playlistId) => {
    addToPlaylist.mutate({ playlistId, uris: [`spotify:track:${selectedSongId}`] });
    setOpen(false);
  };

  return (
    <Box sx={{ padding: "24px", color: "white" }}>
      {/* ======================== TOP RESULT + SONGS GRID ======================== */}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <SectionTitle variant="h5">Top result</SectionTitle>

          {topTrack && (
            <TopResultContainer>
              <Box sx={{ position: "relative", width: "120px", height: "120px" }}>
                <AlbumImage src={topTrack.album?.images?.[0]?.url} />
                <Overlay className="overlay">
                  <PlayButton />
                </Overlay>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {topTrack.name}
                </Typography>
                <Typography variant="body1" color="gray">
                  {topTrack.artists?.[0]?.name}
                </Typography>
              </Box>
            </TopResultContainer>
          )}
        </Grid>

        {/* ======================== SONGS ======================== */}
        <Grid item xs={12} md={6}>
          <SectionTitle variant="h5">Songs</SectionTitle>

          {tracklist?.slice(0, 5).map((song) => (
            <SongRow key={song.id}>
              <Box>
                <Typography variant="body1">{song.name}</Typography>
                <Typography variant="body2" color="gray">
                  {song.artists?.[0]?.name}
                </Typography>
              </Box>

              <AddButton className="addButton" onClick={() => handleOpenModal(song.id)}>
                <AddIcon />
              </AddButton>

              <Typography variant="body2" color="gray" sx={{ width: "40px", textAlign: "right" }}>
                {Math.floor(song.duration_ms / 60000)}:{((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
              </Typography>
            </SongRow>
          ))}
        </Grid>
      </Grid>

      {/* ======================== ARTISTS ======================== */}

      <Box mt={6}>
        <SectionTitle variant="h5">Artists</SectionTitle>
        <Grid container spacing={3}>
          {artistlist?.map((artist) => (
            <Grid item xs={6} sm={4} md={2.4} key={artist.id}>
              <CardContainer>
                <Box sx={{ position: "relative" }}>
                  {artist.images?.[0]?.url ? (
                    <CircleImage src={artist.images?.[0]?.url} />
                  ) : (
                    <CircleIconWrapper>
                      <PersonIcon sx={{ fontSize: 60, color: "white" }} />
                    </CircleIconWrapper>
                  )}

                  <Overlay className="overlay">
                    <PlayButton />
                  </Overlay>
                </Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {artist.name}
                </Typography>
              </CardContainer>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ======================== ALBUMS ======================== */}

      <Box mt={6}>
        <SectionTitle variant="h5">Albums</SectionTitle>
        <Grid container spacing={3}>
          {albumlist?.map((album) => (
            <Grid item xs={6} sm={4} md={2.4} key={album.id}>
              <CardContainer>
                <Box sx={{ position: "relative" }}>
                  <AlbumImage src={album.images?.[0]?.url} />

                  <Overlay className="overlay">
                    <PlayButton />
                  </Overlay>
                </Box>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  {album.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  {album.artists?.[0]?.name}
                </Typography>
              </CardContainer>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ===== Playlist Select Modal ===== */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>플레이리스트에 추가</DialogTitle>
        <DialogContent dividers>
          {!playlistData ? (
            <LoadingSpinner />
          ) : (
            <List>
              {playlistData.pages?.flatMap((page) => page.items)?.map((pl) => (
                <ListItem button key={pl.id} onClick={() => handleSelectPlaylist(pl.id)}>
                  <ListItemAvatar>
                    <Avatar src={pl.images?.[0]?.url} />
                  </ListItemAvatar>
                  <ListItemText primary={pl.name} secondary={pl.owner?.display_name} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

  
      <div ref={ref} style={{ height: "40px" }} />
      {isFetchingNextPage && <LoadingSpinner />}
    </Box>
  );
};

export default SearchResultPage;
