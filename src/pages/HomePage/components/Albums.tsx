import React from 'react'

import { Grid, Typography } from '@mui/material';
import Card from '../../../common/components/Card';
import useGetAlbum from '../../../hooks/useGetAlbum';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';

const Albums = () => {

    const albumIds = [
        "4eLPsYPBmXABThSJ821sqY",
        "2ODvWsOgouMbaA5xf0RkJe",
        "1ATL5GLyefJaxhQzSPVrLX",
        "3SpBlxme9WbeQdI9kx7KAV",
        "4yP0hdKOZPNshxUOjY0cZj",
        "1DFixLWuPkv3KT3TnV35m3"
    ].join(",");

    const { data, isLoading, error } = useGetAlbum(albumIds);

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />
    }

    return (
        <div>
            <Typography variant='h1' fontWeight={700}>
                Album
            </Typography>

            {data && data?.albums?.length > 0 ? (
                <Grid container spacing={2}>

                    {data.albums.map((track) => (
                        <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
                            <Card
                                image={track.images?.[0]?.url ?? ""}
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
    );
};

export default Albums;