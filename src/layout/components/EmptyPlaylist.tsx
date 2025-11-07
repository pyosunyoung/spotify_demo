import React from 'react'
import { Button, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const EmptyPlaylist = () => {

    const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: "20px",
        borderRadius: "8px",
    }));
    const CreatePlaylistButton = styled(Button)({
        marginTop: "20px",
        fontWeight: "700",
      });
  return (
    <EmptyPlaylistCard>
        <Typography variant='h2' fontWeight={700}>Create a playlist</Typography>
        <Typography variant='body2' >Your playlists will appear here.</Typography>
        <CreatePlaylistButton variant='contained' color='secondary'>Create Playlist</CreatePlaylistButton>
    </EmptyPlaylistCard>
  )
}

export default EmptyPlaylist