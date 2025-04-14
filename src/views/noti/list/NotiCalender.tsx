import moment from 'moment';
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { useQueryClient } from 'react-query';
import { useFetchGetNotiRegDates } from 'src/hooks/query/useFetchGetNotiRegDates';
import { formatYYYYMMDDArrayToDashDates, getStartAndEndOfMonthFromValue, getStartOfMonthFromValue, valueToDate } from 'src/utils/date';
import { invalidateMonthIfNeeded } from 'src/utils/query/invalidateMonthIfNeeded';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import styled from "styled-components";
import { INotiCalenderProps } from '../NotiPage';


export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: gra;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      /* color: ${(props) => props.theme.gray_1}; */
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${(props) => props.theme.darkBlack};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: red;
  }

  /* 오늘 날짜(일자) 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      /* color: ${(props) => props.theme.primary_2}; */
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    /* background-color: ${(props) => props.theme.gray_5}; */
    background-color: rgb(237, 245, 253);
    /* color: black; */
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      color: black;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 20px 10px 20px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    /* color: ${(props) => props.theme.gray_1}; */
    color: gray;
  }

  /* 선택한 날짜, hover한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    /* background-color: rgb(67, 206, 215); */
    color:black;
    background-color: rgb(237, 245, 253);
    /* background-color: ${(props) => props.theme.yellow_2}; */
    border-radius: 0.3rem;
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
  position: absolute;
  cursor: pointer;
  left: 7%;
  top: 5%;
  /* background-color: ${(props) => props.theme.primary_3}; */
  background-color: antiquewhite;
  color: darkgoldenrod;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
  &:hover {
    transform: scale(1.1);
  }
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  /* color: ${(props) => props.theme.br_2}; */
  color: blueviolet;
  font-weight: 600;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  /* background-color: ${(props) => props.theme.br_2}; */
  background-color: peru;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
`;

const NotiCalender = ({today,date,setDate}:INotiCalenderProps) => {
  console.log("NotiCalender 랜더링");

  const queryClient = useQueryClient();
  const { authUserInfo } = useAuthStore.getState();

  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const {startDate,endDate} = getStartAndEndOfMonthFromValue(activeStartDate);
  const getNotiRegDates = useFetchGetNotiRegDates(authUserInfo.memberNo,startDate,endDate);
  
  const handleDateChange = (newDate: Value) => {
    if (newDate instanceof Date && date instanceof Date) {
      if (newDate.getTime() === date.getTime()){ 
        return;
      }
    } else if (newDate === date) {
      return;
    }
    setDate(newDate);  
  };

  const handleTodayClick = () => {
    const prev = valueToDate(date)!;
    const current = today;    
    invalidateMonthIfNeeded(queryClient, prev, current, authUserInfo.memberNo);

    // 기존
    // 새로운 Date 객체를 만들어서 넘겨주기 때문에, 값은 같아 보여도 참조(reference)가 달라서 리렌더링 발생
    // setActiveStartDate(today);
    // setDate(today);
    // 개선(비교 후 업데이트)
    if (!prev || prev.getTime() !== today.getTime()) {
      setDate(today);
    }
    if (!activeStartDate || activeStartDate.getTime() !== today.getTime()) {
      setActiveStartDate(today);
    }
  };

  //랜더링 최적화를 위해 useMemo
  // const notiRegMemo = useMemo(() => <NotiReg />, []);
  // const NotiRegButtonMemo = useMemo(()=><NotiRegButton />,[]);

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        // locale='en'
        onChange={handleDateChange}
        formatDay={(_locale, date) => moment(date).format("D")}
        formatYear={(_locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(_locale, date) => moment(date).format("YYYY.MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        activeStartDate={
          activeStartDate === null ? undefined : activeStartDate
        }
        // 달력의 월 변경 버튼(ex. <,>) 누를 시 실행되는 로직
        onActiveStartDateChange={({ activeStartDate }) =>{
          const prev = valueToDate(date)!;
          const current = activeStartDate!;
        
          invalidateMonthIfNeeded(queryClient, prev, current, authUserInfo.memberNo);

          if(getStartOfMonthFromValue(today)===getStartOfMonthFromValue(activeStartDate)){
            setDate(today);
            setActiveStartDate(today);
            return ;
          }
          setDate(activeStartDate);
          setActiveStartDate(activeStartDate);
        }}
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date, view }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) 
            {
              html.push(<StyledToday key={"today"}>TODAY</StyledToday>);
            }
            //출석한 날짜에 점 표시
            if (
              getNotiRegDates.data && formatYYYYMMDDArrayToDashDates(getNotiRegDates.data.data).find((x:any) => x === moment(date).format("YYYY-MM-DD"))
            ) 
            {
              html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
            }
            return <>{html}</>;
          }
        }
      />
      <StyledDate onClick={handleTodayClick}>TODAY</StyledDate>

      {/* <MemorizedSharedModal button={NotiRegButtonMemo}>
        {notiRegMemo}
      </MemorizedSharedModal> */}

  </StyledCalendarWrapper>
  );
}

export default NotiCalender;

// 부모가 여러 state를 가졌을 경우 재랜더링될 경우 이점을 지님. 부모의 state가 객체라 이점 보기 힘들어 기본 export 채택
// export const MemoizedNotiCalender=React.memo(NotiCalender);

// <랜더링 확인>

// - NotiPage 첫 랜더링( NotiList 주석)
// 랜더링:  NotiPage-> NotiCalender -> SharedModal -> NotiRegButton -> NotiCalender -> SharedModal -> NotiRegButton
// 이유: 
// 1. NotiPage는 최초 부모페이지므로 첫랜더링
// 2. NotiCalender는 NotiPage의 자식 컴포넌트이므로 첫랜더링
// 3. SharedModal은 NotiCalender의 자식 컴포넌트이므로 첫랜더링
// 4. NotiRegButton은 SharedModal에서 props로 받긴 하지만 자식컴포넌트이므로 첫랜더링
// --- useQuery로 인해 아래 다시 랜더링 된다.
// 5. NotiCalender에선 useQuery가 진행 중이므로 fetching 완료된 상태를 업데이트하기 위해 재랜더링
// 6. SharedModal은 부모 컴포넌트인 NotiCalender가 리랜더링되었기에 함께 리랜더링(props를 메모이징 하지 않음,usememo/useCallback/React.memo)
// 7. NotiRegButton는 자식이므로 리랜더링
// -> useQuery로 NotiCalender가 리랜더링되더라도 SharedModal의 리랜더링을 막기 위해 SharedModal의 메모이징과 SharedModal의 props 변경을 막기 위해 useMemo 적용
// -> 성공(NotiPage-> NotiCalender -> SharedModal -> NotiRegButton -> NotiCalender)