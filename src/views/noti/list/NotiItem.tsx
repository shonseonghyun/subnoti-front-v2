import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useFetchDelNoti } from 'src/hooks/mutation/useFetchDelNoti';
import { formatFullDateTimeToKorean } from 'src/utils/date';
import { toastSucMsg } from 'src/utils/toast/toast';
import { INotiItemType } from './NotiList';

type NotiItemProps ={
  noti : INotiItemType
  doPostProcessOfDelSubNoti: () => void;

}

export default function NotiItem({noti,doPostProcessOfDelSubNoti}:NotiItemProps) {
  console.log("NotiItem 랜더링: ",noti.notiNo,noti.matchName,"/",noti.subType);

  const clickedItem = useCallback(()=>{
    window.open(`https://www.plabfootball.com/match/${noti.matchNo}/`);
  },[noti.matchNo]);

  //============================ useFetchJoin =======================================//
  const queryClient = useQueryClient();
  const onDelNotiSuccess = () =>{
    toastSucMsg("해제 완료하였습니다.");
    doPostProcessOfDelSubNoti();
    queryClient.invalidateQueries(['noti','dates'], { refetchInactive: true });
  }
  const delNotiMutation = useFetchDelNoti(onDelNotiSuccess);
  //============================ useFetchJoin =======================================//

  
  const clickedDelItem = () =>{
    delNotiMutation.mutate(noti.notiNo);
  }

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea onClick={clickedItem}>
        <CardContent>
          <Typography gutterBottom  variant="h6" sx={{ color: 'text.secondary'  }}>
              {noti.subType=="MANAGER_FREE" ? "매니저 서브" : "슈퍼 서브"} 
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {formatFullDateTimeToKorean(noti.startDt+noti.startTm)} 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {noti.matchName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{background:"aliceblue"}}>
        <Button size="small" color="primary" onClick={clickedDelItem}>
          알림 해제
        </Button>
      </CardActions>
    </Card>
  );
}

// 별효과를 못보는듯하다. -> 삭제 시 유무에 리랜더링 따른 차이가 없음
export const MemoizedNotiItem = React.memo(NotiItem);