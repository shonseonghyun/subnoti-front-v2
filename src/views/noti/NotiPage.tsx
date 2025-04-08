// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useState } from 'react';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { getTodayAtMidnight } from 'src/utils/date';
import DashboardCard from '../../components/shared/DashboardCard';
import NotiCalender from './list/NotiCalender';
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
  console.log("NotiPage 랜더링");
  // 자식 컴포넌트(형제 컴포넌트)들 간 date라는 state를 공유
  /*
   * NotiCalnder컴포넌트에서 유저가 선택한 date를
   * NotiList컴포넌트에서 사용하여 해당 날짜에 해당하는 등록된 Noti list들을 불러옴
   * date state가 변한다면 두 자식 컴포넌트 모두 변해야 한다.
   */
  const today = getTodayAtMidnight();
  const [date, setDate] = useState<Value>(today); //객체라서 React.memo 이점을 보기 힘들다.

  return (
    <DashboardCard title="Noti">
      <NotiCalender today={today} date={date} setDate={setDate}/>
      <NotiList date={date} />
    </DashboardCard>
  );
};

export default NotiPage;


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

// - NotiCalender 특정일 클릭
// case1) 아무것도 없는 날 클릭
// 랜더링: 1.NotiPage-> 2.NotiCalender-> 3.NotiList-> 4.NotiList -> 5.NotiList
// 이유:
// 1. NotiPage는 해당 컴포넌트가 가진 state인 date가 변경 되었기에 리랜더링
// 2. NotiCalender는 NotiPage의 자식이기에 리랜더링(메모이징 하지 않은 상태)
// 3. NotiList는 NotiPage의 자식이기에 리랜더링(메모이징 하지 않은 상태)
// 4,5. NotiList의 useuQuery로 인해 2번의 리랜더링 발생(status =loading 에서 success )
// => 최적화할 포인트 안보임..

// case2) 있는 날 클릭
// 랜더링: 1.NotiPage-> 2.NotiCalender-> 3.NotiList-> 4.NotiList -> 5.NotiList -> 존재하는 NotiItem개수만큼 랜더링
// 이유:
// 1. NotiPage는 해당 컴포넌트가 가진 state인 date가 변경 되었기에 리랜더링
// 2. NotiCalender는 NotiPage의 자식이기에 리랜더링(메모이징 하지 않은 상태)
// 3. NotiList는 NotiPage의 자식이기에 리랜더링(메모이징 하지 않은 상태)
// 4,5. NotiList의 useuQuery로 인해 2번의 리랜더링 발생(status =loading 에서 success )
// 6. NotiItem 존재하는 개수만큼 랜더링
// => 최적화할 포인트 안보임..

// - 노티 아이템 삭제
// 랜더링: 
// NotiItem(삭제 대상) -> NotiCalender -> NotiList -> NotiItem(기존 존재 대상) -> NotiItem(삭제 대상) -> NotiCalender -> NotiList ->NotiItem(기존)
// 이유: 
// 1. NotiItem 삭제대상 랜더링은 
// 2. NotiCalender는 삭제 성공 시 쿼리 무효화 메소드로 인해 리랜더링
// 3. NotiList는 또한 위와 동일
// 4. NotiItem 기존 대상은 부모 컴포넌트인 NotiItem이 리랜더링 되면서 함께 리랜더링
// 5. 위와 동일
// 6. NotiCalender는 쿼리 무효화 후 실제 데이터 적용되면서 한번 더 리랜더링
// 7. NotiList는 또한 위와 동일하게 재패치 되므로 리랜더링
// 8. NotiItem 기존대상은 부모 컴포넌트가 리랜더링되므로 함께 리랜더링
// -> 부모가 리랜더링되면서 함꼐 리랜더링 되는 삭제 대상이 아닌 NotiItem에 대해 최적화가 가능해 보인다.
// -> NotiItem React.Memo 적용 -> 최적화 성공(4,8번째 랜더링 사라짐)


// - 노티 아이템 등록
// case1) 노티 등록 버튼 클릭
// 랜더링: SharedModal -> NotiRegButton -> NotiReg 랜더링 -> NotiReg 랜더링
// 이유:
// 1. SharedModal은 state가 변화하면서 랜더링
// 2. NotiRegButton은 SharedModals의 props로 받긴 했으나 그로 안해 자식 컴포넌트가 되어 랜더링
// 3,4. NotiReg 2번의 랜더링은 useQuery로 인한 2번의 랜더링 발생

// case2) api 인증 실패
// 문제 없음

// case3) 인증 버튼 클릭 시 유효성검증 실패
// useformhook의 mode와 trigger, resetfield로 인한 3번의 notireg 랜더링 발생

// case4) 인증 성공
// 문제 없음

