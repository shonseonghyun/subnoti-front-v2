// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useState } from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import NotiCalender from './list/NotiCalender';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import NotiList from './list/NotiList';

export interface INotiCalenderProps{
  today: Date,
  date: Value,
  setDate: React.Dispatch<React.SetStateAction<Value>>
}

export interface INotiListProps{
  date: Value,
}

const NotiPage = () => {
  // 자식 컴포넌트(형제 컴포넌트)들 간 date라는 state를 공유
  /*
   * NotiCalnder컴포넌트에서 유저가 선택한 date를
   * NotiList컴포넌트에서 사용하여 해당 날짜에 해당하는 등록된 Noti list들을 불러옴
   * date state가 변한다면 두 자식 컴포넌트 모두 변해야 한다.
   */
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  return (
    <DashboardCard title="Noti">
      <NotiCalender today={today} date={date} setDate={setDate}/>
      <NotiList date={date} />
    </DashboardCard>
  );
};

export default NotiPage;
