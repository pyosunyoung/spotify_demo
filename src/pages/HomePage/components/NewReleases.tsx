import {Grid, Typography } from '@mui/material'
import React from 'react'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />
  }
  
  return (
    <div>
      <Typography variant='h1' fontWeight={700}>New Releases Albums</Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album)=>(
            <Grid size={{xs:6, sm:4, md:2}} key={album.id}>
              <Card 
              image={album.images[0].url}
              name={album.name}
              artistName={album.artists[0].name} //undefined도 올 수 있다 오류 해결결
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

export default NewReleases