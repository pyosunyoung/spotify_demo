import React from 'react'
import { Track } from '../../../models/track'
import { Typography } from '@mui/material'

interface SearchResultlistProps {
    list: Track[]
}

const SearchResultlist = ({ list }: SearchResultlistProps) => {
    return (
        <div>{list.map((track) => <Typography variant='h2'>{track.name}</Typography>)}</div>
    )
}

export default SearchResultlist