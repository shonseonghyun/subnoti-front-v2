import { Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useFetchGetNotiListByDate } from 'src/hooks/useFetchGetNotiListByDate';
import { formatCalendarValueToYYYYMMDD } from 'src/utils/date';
import { INotiListProps } from '../NotiPage';
import NotiItem from './NotiItem';

export interface INotiItemType{
    notiNo:number,
    matchNo:number,
    matchName:string,
    startDt:string,
    startTm:string,
    subType:string
}

const NotiList = ({date}:INotiListProps) => {
    const getSubNoti = useFetchGetNotiListByDate(1,formatCalendarValueToYYYYMMDD(date));

    return (
        <>
            {
                getSubNoti.data && getSubNoti.data.data.length>0
                ?
                <DashboardCard>
                    <Stack spacing={2}>
                        {
                            getSubNoti.data.data.map((item:INotiItemType)=>{
                                return <NotiItem key={item.notiNo} noti={item}/>
                            })
                        }
                    </Stack>
                </DashboardCard>
                :
                <></>
            }
        </>
    );
};

export default NotiList;