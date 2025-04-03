import { Stack } from '@mui/material';
import { useFetchGetNotiListByDate } from 'src/hooks/query/useFetchGetNotiListByDate';
import { formatCalendarValueToYYYYMMDD } from 'src/utils/date';
import { INotiListProps } from '../NotiPage';
import { MemoizedNotiItem } from './NotiItem';
import { useAuthStore } from 'src/zustand/AuthUserInfo';

export interface INotiItemType{
    notiNo:number,
    matchNo:number,
    matchName:string,
    startDt:string,
    startTm:string,
    subType:string
}

const NotiList = ({date}:INotiListProps) => {
    console.log("NotiList 랜더링");
    const authUserInfo = useAuthStore((state) => state.authUserInfo);

    //============================ useFetchGetNotiListByDate =======================================//
    const getSubNoti = useFetchGetNotiListByDate(authUserInfo.memberNo,formatCalendarValueToYYYYMMDD(date));
    //============================ useFetchGetNotiListByDate =======================================//

    return (
        <>
            {
                getSubNoti.data && getSubNoti.data.data.length>0
                ?
                <Stack spacing={2} marginTop={5}>
                    {
                        getSubNoti.data.data.map((item:INotiItemType)=>{
                            return <MemoizedNotiItem key={item.notiNo} noti={item}/>
                        })
                    }
                </Stack>
                :
                <></>
            }
        </>
    );
};

export default NotiList;