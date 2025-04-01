import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { INotiItemType } from './NotiList';
import { useFetchDelNoti } from 'src/hooks/useFetchDelNoti';
import { formatFullDateTimeToKorean } from 'src/utils/date';

type NotiItemProps ={
  noti : INotiItemType
}

export default function NotiItem({noti}:NotiItemProps) {
  console.log("NotiItem 랜더링: ",noti.notiNo);

  const clickedItem = useCallback(()=>{
    window.open(`https://www.plabfootball.com/match/${noti.matchNo}/`);
  },[noti.matchNo]);

  const delNotiMutation = useFetchDelNoti();
  const clickedDelItem = () =>{
    delNotiMutation.mutate(noti.notiNo);
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea onClick={clickedItem}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {formatFullDateTimeToKorean(noti.startDt+noti.startTm)} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {noti.matchName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={clickedDelItem}>
          Del
        </Button>
      </CardActions>
    </Card>
  );
}

export const MemoizedNotiItem = React.memo(NotiItem);