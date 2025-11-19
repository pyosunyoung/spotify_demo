import React from 'react'
import ErrorMessage from '../../../common/components/ErrorMessage';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import useGetAlbum from '../../../hooks/useGetAlbum';
import useGetAlbumTracks from '../../../hooks/useGetAlbumTracks';
import {Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';

const Tracks = () => {
    const { data, error, isLoading } = useGetAlbumTracks({
        ids: [
          "3rmo8F54jFF8OgYsqTxm5d",
          "1e1JKLEDKP7hEQzJfNAgPl",
          "29TPjc8wxfz4XMn21O7VsZ",
          "2BJSMvOGABRxokHKB0OI8i",
          "7KXjTSCq5nL1LoYtL7XAwS",
          "3yfqSUWxFvZELEM4PmlwIR"
        ].join(",")
      });
    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />
    }
    console.log("getAlbumTracks", data)
    return (
        <div>
            <Typography variant='h1' fontWeight={700}>
                Tracks
            </Typography>

            {data && data?.tracks?.length > 0 ? (
                <Grid container spacing={2}>

                    {data.tracks.map((track) => (
                        <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
                            <Card
                               image={track.album?.images?.[0]?.url ?? ""}
                               name={track.name}
                               artistName={track.artists?.[0]?.name ?? "Unknown Artist"}
                            />
                        </Grid>
                    ))}

                </Grid>
            ) : (
                <Typography variant='h2'>No data</Typography>
            )}
        </div>
    )
}

export default Tracks