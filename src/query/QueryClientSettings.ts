import { QueryClient } from "react-query";
import { toastFail } from "src/utils/toast/toast";

export const QueryClientSettings = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000,
        // staleTime: 2000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry:1,
        useErrorBoundary:true,
        onError:(error:any) =>{
          toastFail(error);
        }
      },
      
      mutations:{
        useErrorBoundary:false,
        onError:(error:any) =>{
          console.log("index.tsx mutations onError");
          toastFail(error);
        }
      }
    },
  });
};

// React Query: onSuccess/onError 글로벌 핸들러 vs 개별 핸들러
// 🔍 글로벌 핸들러를 사용할 때 (QueryClient를 통한 전역 설정)
// 여러 곳에서 공통 동작이 필요할 때: 동일한 후처리 로직을 여러 쿼리/뮤테이션마다 반복한다면, 그 로직을 전역으로 “호이스팅”하는 것이 효율적입니다​
// . 예를 들어 모든 API 오류에 대해 공통으로 토스트 알림을 띄우거나 로깅하는 경우 QueryClient 설정의 onError를 활용해 한 곳에서 처리할 수 있습니다​
// . 이렇게 하면 각 컴포넌트마다 중복 코드를 작성하지 않아도 됩니다.
// 애플리케이션 전역에서 일관된 처리 필요할 때: 전역 오류 핸들러를 쓰면 모든 쿼리/뮤테이션이 동일한 로직을 따르게 되어 일관성이 높아집니다​
// . 개별 컴포넌트에 맡겨 두면 처리 방식이 들쭉날쭉해질 수 있지만, 전역 설정은 한 곳에서 제어되므로 유지보수가 쉬워지고 디버깅도 간편해집니다 (오류 상태의 단일 출처 확보)​
// .
// 여러 컴포넌트에서 동일한 쿼리를 쓸 때: React Query에서 같은 데이터를 조회하는 useQuery가 여러 컴포넌트에 있을 경우, 각 컴포넌트의 onError나 onSuccess가 모두 실행되어 중복 효과가 생길 수 있습니다. 전역 QueryClient 콜백은 쿼리당 한 번만 실행되므로(컴포넌트 밖에서 동작) 이러한 문제를 막을 수 있습니다​
// . 예를 들어 전역 onError로 설정한 토스트 알림은 해당 쿼리가 실패할 때 한 번만 뜨고, 같은 쿼리를 사용하는 다른 화면에서 중복으로 뜨지 않습니다​
// .
// 글로벌 예외 처리/인증 처리: 전역 onError는 범용적인 예외 상황을 한 곳에서 처리하기에 적합합니다. 대표적으로 인증 만료나 권한 오류(HTTP 401) 발생 시, 매 요청마다 처리 코드를 넣는 대신 QueryClient의 전역 onError에서 토큰 재발행 또는 로그아웃 처리를 할 수 있습니다​
// STACKOVERFLOW.COM
// . 예시: 모든 쿼리 실패를 잡아 error.status === 401인 경우 자동으로 리프레시 토큰을 요청하고, 관련 쿼리를 재시도하는 로직을 전역에 구현​
// STACKOVERFLOW.COM
// .
// 팀 규모가 크고 프로젝트가 복잡한 경우: 전역 핸들러를 활용한 중앙집중식 에러 처리를 권장합니다. 대형 프로젝트에서는 모든 개발자가 일관된 패턴으로 오류를 처리하도록 가이드하기 어렵기 때문에, 전역 설정으로 기본 동작(예: “알 수 없는 오류 발생” 토스트)을 정해두면 편합니다. 또한 전역 핸들러는 백그라운드 에러 등 개별 화면에서 누락하기 쉬운 경우까지 잡아주어 앱 전반의 견고성을 높입니다​
// MEDIUM.COM
// . (단, 전역 처리만으로 모든 상황을 다루긴 어렵기 때문에 특정 케이스는 여전히 개별 처리해야 합니다​
// MEDIUM.COM
// .)
// 전역 로딩/성공 처리 등이 필요한 경우: 성공 시에도 공통으로 수행할 작업이 있다면 전역 onSuccess를 고려할 수 있습니다. 예를 들어 모든 뮤테이션 성공 시 성공 토스트를 띄우는 일관된 UX를 원한다면 QueryClient defaultOptions.mutations.onSuccess로 설정해 둘 수 있습니다. 다만 성공 후 동작은 대개 개별적이어서, 전역 onSuccess는 오류 처리만큼 흔하지 않습니다.
// 체크포인트: 전역 핸들러는 QueryClient 생성 시 defaultOptions 또는 QueryCache/MutationCache 옵션으로 지정합니다. defaultOptions에 넣은 onSuccess/onError는 **기본값(fallback)**으로 작동하여 각 훅에 별도 지정이 없을 때만 실행됩니다​
// GITHUB.COM
// . 반면 QueryCache의 onError 등을 사용하면 항상 실행되므로, 개별 onError와 중복 실행될 수 있음을 유의하세요​
// GITHUB.COM
// . (중복을 피하려면 전역 기본값과 개별 핸들러를 함께 쓰지 않는 편이 낫습니다.)
// 🎯 개별 핸들러를 사용할 때 (useQuery/useMutation 내부 처리)
// 특정 컴포넌트/맥락에 의존하는 로직일 때: 후속 동작이 해당 화면이나 비즈니스 로직에 한정된다면 개별 onSuccess/onError를 사용해야 합니다. 예를 들어 폼 전송 실패 시 폼 필드 아래 에러 메시지를 표시하거나, 로그인 API 오류 시 로그인 화면에만 영향을 주는 상태 업데이트가 필요하다면 컴포넌트 내부에서 onError를 구현하는 편이 좋습니다. 이러한 경우 전역 핸들러는 세부 맥락을 몰라서 제대로 대응하기 어렵습니다.
// 성공 결과를 활용하여 UI 상태를 갱신할 때: onSuccess를 통해 컴포넌트의 로컬 상태를 변경하거나 다음 동작을 트리거해야 하는 상황이라면 (예: 데이터 저장 성공 후 모달 닫기, 페이지 이동, 캐시 무효화 등) 개별 핸들러를 써야 합니다. 전역 onSuccess로는 어떤 화면에서 어떤 후처리가 필요한지 구분하기 어려우므로, 각 훅 호출 시 필요한 작업을 명시적으로 정의하는 것이 안전합니다.
// 전역 기본 동작을 무시하거나 커스터마이징해야 할 때: 어떤 특정 요청에 대해서는 전역 핸들러의 동작을 피하고 자체적으로 처리하고 싶을 수 있습니다. 이 경우 해당 useQuery/useMutation에서 자체 onError를 구현하면 QueryClient에 지정된 기본 onError를 덮어쓰게 됩니다​
// GITHUB.COM
// . 예를 들어 대부분의 에러는 전역 토스트로 처리하지만, 회원가입 API 오류는 전역 토스트 대신 별도의 안내 모달을 띄우고 싶다면 그 API 훅에서만 onError를 별도로 지정합니다 (이렇게 하면 전역 fallback은 호출되지 않습니다).
// 글로벌 핸들러로 커버하기 어려운 예외적인 시나리오: 앞서 언급했듯 전역 핸들러는 보편적인 처리를 담당하고, 세부적인 예외 케이스까지 모두 포착하지는 못합니다​
// MEDIUM.COM
// . UI/UX적으로 특별한 대응이 필요한 성공/실패 케이스(예: 결제 성공 시 애니메이션 실행, 특정 에러 코드에 대한 사용자 설문 표시 등)는 해당 요청을 호출하는 곳에서 개별적으로 핸들링합니다. 전역에 너무 많은 분기(case)를 넣으면 오히려 관리가 어려워지므로, 특정 시나리오는 로컬에서 책임지는게 명확합니다.
// 팀 규모가 작거나 단순한 경우: 소규모 프로젝트에서는 필요한 곳에서만 onSuccess/onError를 지정하는 방식이 직관적일 수 있습니다. 개발 인원이 적으면 서로 코드 스타일을 맞추기 쉬우므로, 굳이 전역 패턴을 강제하기보다 각 컴포넌트에서 명시적으로 처리해도 무방합니다. 이때 전역 핸들러는 최소한으로 두고(또는 아예 없이) 상황별로 개별 처리하면 구현이 단순해질 수도 있습니다. 단, 오류 처리를 빼먹는 실수를 방지하려면 전역 기본 onError를 간단히라도 설정해 두는 것이 안전합니다 (예: 콘솔 로그나 기본 토스트).
// 📋 판단 기준 체크리스트
// 아래 질문에 **“예”**가 많을수록 글로벌 핸들러를 활용하는 편이 유리하고, **“아니오”**가 많다면 개별 핸들러로 접근하는 것이 적합합니다.
//  이 후처리 로직이 여러 곳에서 반복되는가? (예: 모든 API 에러 로그 출력) – 그렇다면 전역으로 한 번만 정의 
// GITHUB.COM
// .
//  여러 컴포넌트에서 같은 쿼리를 사용할 때 부작용 중복 문제가 있는가? – 그렇다면 전역 onError/onSuccess로 쿼리당 1회만 실행되도록 관리 
// TKDODO.EU
// .
//  앱 전역적으로 동일한 사용자 경험이 필요한가? (예: 모든 데이터 오류는 동일한 모달 표시) – 전역 핸들러로 일관성 유지 
// MEDIUM.COM
// .
//  특정 API 호출 후 특별한 UI 변화가 필요한가? – 그렇다면 해당 훅 호출부에서 개별 onSuccess/onError 구현 (전역으론 세부 UI 제어 불가).
//  전역 핸들러가 알 수 없는 맥락이나 정보가 필요한가? (예: 컴포넌트 내부 상태) – 그렇다면 개별 핸들러로 처리.
//  모든 에러/성공에 일괄 대응이 가능한가, 아니면 케이스별 분기가 많은가? – 분기가 많으면 개별로 나누고, 보편적 대응은 전역에 맡기기​
// MEDIUM.COM
// .
//  팀원들이 오류 처리를 일일이 구현하는 데 부담이 있는가? – 그렇다면 기본값으로 전역 onError를 설정해 두고 필요시만 override 하도록 가이드.
//  프로젝트의 성장으로 에러 처리 일관성이 중요해졌는가? – 그렇다면 중앙 관리로 유지보수성 향상 
// MEDIUM.COM
// .
// 위 기준을 종합하면 **전역 핸들러는 “범용적이고 공통적인 부분”**을 담당하고, **개별 핸들러는 “특정 시나리오에 맞춘 부분”**을 담당합니다. 작은 프로젝트나 특별한 후처리가 요구되는 경우에는 개별 onSuccess/onError를 쓰고, 큰 규모나 여러 군데에 걸친 공통 요구사항이 있다면 전역 설정을 활용하는 식으로 선택하세요. 필요하다면 두 접근을 섞어서, 전역 기본 처리 + 개별 맞춤 처리를 병행할 수도 있습니다​
// GITHUB.COM
//  (예: 전역 onError로 기본 토스트를 띄우되, 어떤 컴포넌트에서는 추가로 별도 화면 전환을 수행​
// GITHUB.COM
// ). 이러한 원칙을 체크리스트와 함께 고려하면 상황에 맞는 적절한 설계를 할 수 있을 것입니다.