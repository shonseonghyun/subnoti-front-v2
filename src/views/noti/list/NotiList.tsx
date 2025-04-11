import { Button, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { MemorizedSharedModal } from 'src/components/shared/SharedModal';
import { useFetchGetNotiListByDate } from 'src/hooks/query/useFetchGetNotiListByDate';
import { formatCalendarValueToYYYYMMDD } from 'src/utils/date';
import { toastInfoMsg, toastSucMsg } from 'src/utils/toast/toast';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import { INotiListProps } from '../NotiPage';
import NotiReg from '../reg/NotiReg';
import { MemoizedNotiItem } from './NotiItem';
import NotiRegButton from './NotiRegButton';

const pageSize = 2;

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
    const queryClient = useQueryClient();

    const authUserInfo = useAuthStore((state) => state.authUserInfo);

    // 더보기 관련 //
    const [notiList,setNotiList] = useState<INotiItemType[]>([]);
    const [nextNotiNo,setNextNotiNo] = useState<number>();
    
    const doPostProcessingOfRegSubNoti = useCallback(()=>{
        setNextNotiNo(undefined);
        queryClient.invalidateQueries(["noti","list",authUserInfo.memberNo,formatCalendarValueToYYYYMMDD(date),undefined]);
    },[authUserInfo.memberNo,date]);

    const handleLoadMore = () =>{
        const nextNotiNoFromApi = getSubNoti.data.data.nextNotiNo;
        
        if(nextNotiNoFromApi===0){
            toastInfoMsg("마지막 페이지입니다");
        }
        else{
            setNextNotiNo(nextNotiNoFromApi);
        }
    }


    //일자가 변경된 시 처리해야하는 로직 부분
    // useEffect(()=>{
    //     console.log("[date]리랜더링 발생");
    //     console.log("일자가 변경된 시 처리해야하는 로직 부분");

    //     const cachedData = queryClient.getQueryData([
    //         "noti",
    //         "list",
    //         authUserInfo.memberNo,
    //         formatCalendarValueToYYYYMMDD(date),
    //         undefined,
    //       ]) as { data: { freeSubNotiList: INotiItemType[] } } | undefined;
        
    //       if (cachedData?.data?.freeSubNotiList) {
    //         setNotiList((prevList) =>
    //           prevList ? [...prevList, ...cachedData.data.freeSubNotiList] : cachedData.data.freeSubNotiList
    //         );
    //       }

    //     return()=>{
    //         setNotiList([]); //일자가 변경된 경우 해당 일자에 맞는 NotiList 넣어줘야 하기에 notiList state초기화
    //     }
    // },[date]);


    const handleDelSuccess = useCallback((deletedNotiNo: number) => {
        toastSucMsg("해제 완료하였습니다.");
        setNotiList((prevList) => prevList.filter((item) => item.notiNo !== deletedNotiNo));
      }, []);
    
    //============================ useFetchGetNotiListByDate =======================================//
    // api 통신 통한 조회 성공 경우 조회된 데이터를 notiList 추가 진행
    const onGetSubNotiSuccess = (data:any)=>{
        if(nextNotiNo==null){
            setNotiList([]);
        };

        setNotiList((prevList)=>
        prevList 
        ? [...prevList,...data.data.freeSubNotiList] 
        : data.data.freeSubNotiList
        );
    }

    const getSubNoti = useFetchGetNotiListByDate(authUserInfo.memberNo,formatCalendarValueToYYYYMMDD(date),pageSize,nextNotiNo,onGetSubNotiSuccess);
    //============================ useFetchGetNotiListByDate =======================================//

    const notiRegMemo = useMemo(() => <NotiReg doPostProcessingOfRegSubNoti={doPostProcessingOfRegSubNoti}/>, []);
    const NotiRegButtonMemo = useMemo(()=><NotiRegButton />,[]);

    return (
        <>
            {
                notiList && notiList.length>0
                ?
                <>
                    <Stack spacing={2} marginTop={5}>
                        {
                            notiList.map((item:INotiItemType)=>{
                                return <MemoizedNotiItem key={item.notiNo} noti={item} handleDelSuccess={handleDelSuccess}/>
                            })
                        }
                    </Stack>
                    <Button
                        onClick={handleLoadMore}
                        fullWidth
                        size="large"
                        sx={{ mt: 3 ,border:"1px solid rgba(0,0,0,0.1)", borderRadius:"0px"}}
                    >
                        더 보기
                    </Button>
                </>
                :
                <></>
            }
            
            <MemorizedSharedModal button={NotiRegButtonMemo}>
                {notiRegMemo}
            </MemorizedSharedModal>
        </>
    );
};

export default NotiList;
// export const MemoizedNotiList = React.memo(NotiList,(prev,next)=>{
//     return prev.date?.toString()=== next.date?.toString();
// });
// export const MemoizedNotiList = React.memo(NotiList);