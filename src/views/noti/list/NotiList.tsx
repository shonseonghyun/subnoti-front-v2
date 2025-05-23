import { Button, Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { MemorizedSharedModal } from 'src/components/shared/SharedModal';
import { useFetchGetNotiListByDate } from 'src/hooks/query/useFetchGetNotiListByDate';
import { useDidUpdate } from 'src/hooks/useDidUpdate';
import { formatCalendarValueToYYYYMMDD } from 'src/utils/date';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import { INotiListProps } from '../NotiPage';
import NotiReg from '../reg/NotiReg';
import { MemoizedNotiItem } from './NotiItem';
import NotiRegButton from './NotiRegButton';

const pageSize = 2;

interface INotiState {
    notiList: INotiItemType[];
    nextNotiNo?: number;
    isLastPage: boolean;
  }

export interface INotiItemType{
    notiNo:number,
    matchNo:number,
    matchName:string,
    startDt:string,
    startTm:string,
    subType:string
}

const NotiList = ({date}:INotiListProps) => {
    console.log("NotiList 랜더링:",date);

    const queryClient = useQueryClient();
    const authUserInfo = useAuthStore((state) => state.authUserInfo);

    // 더보기 관련 //
    const [notiState, setNotiState] = useState<INotiState>({
        notiList: [],
        nextNotiNo: undefined,
        isLastPage: false,
      }
    );

    //date값을 최신값으로 쓰기위해 추가
    const dateRef = useRef(date);
        useEffect(() => {
        dateRef.current = date;
    }, [date]);

    
    const doPostProcessOfSubNoti = useCallback(()=>{
        console.log("doPostProcessOfSubNoti");
        // const {startDate,endDate} = getStartAndEndOfMonthFromValue(dateRef.current);

        //노티 등록,삭제,일자 변경 시 첫 페이지(refetch)로 돌아가기 위한 후처리 작업 진행
        setNotiState({
            notiList: [],
            nextNotiNo: undefined,
            isLastPage: false,
        });
        
        // invalidateQueries를 "다음 틱"으로 밀어서 상태 변경 이후 실행되게
        Promise.resolve().then(() => {
            queryClient.invalidateQueries([
              "noti",
              "list",
            authUserInfo.memberNo,
              formatCalendarValueToYYYYMMDD(dateRef.current),
            ]);
        });
        },[authUserInfo.memberNo,date]
    );
    useDidUpdate(doPostProcessOfSubNoti,[date]);

    // 날짜 변경에 대한 후처리 부분
    // 즉시 실행해버리기 때문에 doPostProcessOfSubNoti() 내부의 date는 여전히 이전 값(초기값) 을 참조하고 있는 상태
    // 그래서 useRef로 최신값을 바라바도록 수정
    // 첫 랜더링 시 수행되지 않아도 되므로 주석
    // useMemo(() => {
    //     doPostProcessOfSubNoti();dl
    // }, [date]);
    // 개선


    const handleLoadMore = () =>{
        const next = getSubNoti.data.data.nextNotiNo;
        setNotiState((prev)=>({...prev,nextNotiNo:next}));
    }


    //============================ useFetchGetNotiListByDate =======================================//
    // api 통신 통한 조회 성공 경우 조회된 데이터를 notiList 추가 진행
    const onGetSubNotiSuccess = (data:any)=>{
        console.log("onGetSubNotiSuccess");
        const fetchedNotiList = data.data.freeSubNotiList;
        const next = data.data.nextNotiNo;

        setNotiState((prev)=>({
            notiList: prev.nextNotiNo ==null ? fetchedNotiList : [...prev.notiList,...fetchedNotiList],
            nextNotiNo: prev.nextNotiNo,
            isLastPage: next == 0  
        })) 
    }
    const getSubNoti = useFetchGetNotiListByDate(authUserInfo.memberNo,formatCalendarValueToYYYYMMDD(date),pageSize,notiState.nextNotiNo,onGetSubNotiSuccess);
    //============================ useFetchGetNotiListByDate =======================================//

    // React 랜더링 최적화
    const notiRegMemo = useMemo(() => <NotiReg doPostProcessOfRegSubNoti={doPostProcessOfSubNoti} />, []);
    const NotiRegButtonMemo = useMemo(()=><NotiRegButton />,[]);

    return (
        <>
            {
                notiState.notiList.length>0
                ?
                <>
                    <Stack spacing={2} marginTop={5}>
                        {
                            notiState.notiList.map((item:INotiItemType)=>{
                                return <MemoizedNotiItem key={item.notiNo} noti={item} doPostProcessOfDelSubNoti={doPostProcessOfSubNoti}/>
                            })
                        }
                    </Stack>
                    {
                        !notiState.isLastPage && 
                        <Button
                            onClick={handleLoadMore}
                            fullWidth
                            size="large"
                            sx={{ mt: 3 ,border:"1px solid rgba(0,0,0,0.1)", borderRadius:"0px"}}
                        >
                            더 보기
                        </Button>
                    }
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
// (NotiList as any).whyDidYouRender = true;

// export const MemoizedNotiList = React.memo(NotiList,(prev,next)=>{
//     return prev.date?.toString()=== next.date?.toString();
// });
// export const MemoizedNotiList = React.memo(NotiList);