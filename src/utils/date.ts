import { Value } from "react-calendar/dist/esm/shared/types.js";

export interface Idate{
    year:string,
    month:string,
    date: string,
    day: string
}

/** 요일을 반환
 * @param {number} day
 * @returns {string}
 */
export const getWeekdayKorean = (day: number) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  return week[day];
};

// export const getDatesStartToLast = (startDate:Date, lastDate:Date) => {
//     const result: Idate[] = [];
//     while (startDate <= lastDate) {
//         // startDate.toISOString().split('T')[0] / ex)2024-08-26
//         let year = startDate.getFullYear().toString();
//         let month = getMonthByFormat(startDate.getMonth());
//         let day =  getWeek(startDate.getDay());
//         let date = getDateByFormat(startDate.getDate());

//         result.push({year,month,date,day}); 

//         startDate.setDate(startDate.getDate() + 1);
//     }
//     return result;
// }

// export const getDatesTodayToTwoWeeksLater = () => {
//   const today = new Date();
//   const twoWeekLater = new Date(today);
//   twoWeekLater.setDate(today.getDate()+13);
//   return getDatesStartToLast(today,twoWeekLater); 
// }

export const getMonthByFormat = (month:number)=>{
  return (month + 1).toString().length==1 ? "0"+(month + 1).toString() : (month + 1).toString()
}

export const getDateByFormat = (date:number)=>{
  return date.toString().length==1 ? "0"+date.toString() : date.toString()
}


/** 오늘 년월일을 반환(ex.20253028)
 * @returns {string}
 */
export const getToday = () =>{
  const dt = new Date();
  const year = dt.getFullYear().toString();
  const month = getMonthByFormat(dt.getMonth()); 
  const date = getDateByFormat(dt.getDate());    
  const today = year+ month+date;
  return today;
}


/** dateTime(202503111800)을 포맷팅된 문자열로 변환(3월 28일 금요일 11:00)
 * @param {string}} dataTime
 * @returns {string}
 */
export const formatFullDateTimeToKorean = (dateTimeStr: string) => {
  const year = parseInt(dateTimeStr.slice(0, 4));
  const month = parseInt(dateTimeStr.slice(4, 6)) - 1;
  const day = parseInt(dateTimeStr.slice(6, 8));
  const hour = parseInt(dateTimeStr.slice(8, 10));
  const minute = parseInt(dateTimeStr.slice(10, 12));
  const date = new Date(year, month, day, hour, minute);
  return `${month + 1}월 ${day}일 ${getWeekdayKorean(date.getDay())}요일 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const formatYYYYMMDDtoDashDate = (dateString: any) => {
  if (typeof dateString !== 'string') {
    dateString = dateString.toString();
  }
  if (dateString.length !== 8) {
    throw new Error("Invalid date format. Expected format: YYYYMMDD");
  }
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
};

export const formatYYYYMMDDArrayToDashDates = (arr: any) => {
  return Array.from(arr).map((item) => formatYYYYMMDDtoDashDate(item));
};


export const formatCalendarValueToYYYYMMDD = (dateValue: Value): string => {
  const format = (date: Date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}${month}${day}`;
  };

  if (dateValue instanceof Date) {
    return format(dateValue);
  }

  // if (Array.isArray(dateValue) && dateValue[0] instanceof Date && dateValue[1] instanceof Date) {
  //   console.log("Array.isArray(dateValue) && dateValue[0] instanceof Date && dateValue[1] instanceof Date");
  //   return [format(dateValue[0]), format(dateValue[1])];
  // }

  return '';
};

/** 해당 날짜의 해당 월의 시작일과 끝일을 YYYYMMDD 형태로 리턴 (Value 타입 지원) */
export const getStartAndEndOfMonthFromValue = (dateValue: Value): { startDate: string, endDate: string } => {
  if (!(dateValue instanceof Date)) return { startDate: '', endDate: '' };
  const start = new Date(dateValue.getFullYear(), dateValue.getMonth(), 1);
  const end = new Date(dateValue.getFullYear(), dateValue.getMonth() + 1, 0);
  return {
    startDate: formatCalendarValueToYYYYMMDD(start),
    endDate: formatCalendarValueToYYYYMMDD(end)
  };
};