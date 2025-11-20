import React from 'react'
import { PlaylistTrack } from '../../../models/playlist'
import { styled, TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/track';
import moment from 'moment';


interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));


const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => { //유니온 연산자
    return "description" in track // description이 존재하면 true 즉 Episode이다. track이 Episode로 확정짖는다.
  }
  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'no name'}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>
        {item.added_at
          ? moment(item.added_at).format("YYYY-MM-DD")
          : "Unknown"}
      </TableCell>
      {isEpisode(item.track) ? (
        <TableCell>N/A</TableCell>
      ) : (
        <TableCell>
          {moment(item.track.duration_ms).format("mm:ss")}
        </TableCell>
      )}
    </StyledTableRow>
  )//episode에는 앨범이 없음. 그래서 현재 타입이 track 안에 track, episode두개가 있기 때문에 지정해 줘야함.
}

export default DesktopPlaylistItem