import moment from 'moment';
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { useFetchGetNotiRegDates } from 'src/hooks/useFetchGetNotiRegDates';
import { formatYYYYMMDDArrayToDashDates, getStartAndEndOfMonthFromValue } from 'src/utils/date';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import styled from "styled-components";
import SharedModal from '../../../components/shared/SharedModal';
import { INotiCalenderProps } from '../NotiPage';
import NotiReg from '../reg/NotiReg';


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
  top: 6%;
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

  const { authUserInfo } = useAuthStore.getState();

  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
  const {startDate,endDate} = getStartAndEndOfMonthFromValue(date);
  const getNotiRegDates = useFetchGetNotiRegDates(authUserInfo.memberNo,startDate,endDate);
  
  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    // const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };
    
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
        onActiveStartDateChange={({ activeStartDate }) =>{
          console.log(activeStartDate); //이게 달력의 < > 버튼 누를 시
          setActiveStartDate(activeStartDate)}
        }
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
      <SharedModal child={<NotiReg />}/>
  </StyledCalendarWrapper>
  );
}

export default NotiCalender;

  