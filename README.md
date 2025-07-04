# ⏰ 플랩노티
```
 개인이 원하는 시간대의 플랩풋볼 매치에 대한 무료 참가 신청 활성화 시 알림을 보내주는 서비스
```
<br/>


# 📆 개발 기간 / 개발 인원
2024.12 ~ 현재 / 1 명

<br/>

# ⚙ 개발 환경 및 사용 기술
- **Visual Studio Code**
- **React**
  * **Zustand**
    - 사용자 인증 정보 전역 관리 및 접근 제어 UI 구현
    - React Query의 mutation에 대한 글로벌 로딩 상태 관리를 통해 일관된 사용자 경험을 제공하는 UI 구현
   
  * **Axios**
    -  API와 통신을 위한 HTTP 클라이언트
    -  Interceptor 등록하여 요청/응답 전후 필요한 작업 수행(ex. 헤더 세팅,토큰 만료 시 재발급 진행 등)
    -  AxiosError 기반 공통 에러 메시지 유틸 구현
 
  * **React Query**
    - 커스텀 훅 구조를 도입해 API 요청의 비동기 처리를 일관되고 효율적으로 관리
    - QueryClient와 커스텀 훅에 공통 옵션을 적용하여 로딩 상태, 에러 발생, 성공 처리 흐름을 통합

  * **React Error Boundary**
    -  렌더링 중 발생할 수 있는 예외를 사용자에게 친절하게 안내하고, 복구 가능한 구조로 구성
    -  React Query의 에러 경계 처리를 연동해, 페이지 단위에서 발생하는 예외를 사용자 친화적인 메시지와 함께 처리

  * **styled-Components**
    - Props를 활용한 동적 스타일링
      
  * **React-hook-form**
    - 데이터 추적 및 유효성 검사로 코드 양 감소
    - 최소한의 리렌더링으로 성능을 최적화 및 실시간 검증을 통한 UX 개선
   
- **AWS EC2**
  * 서비스 배포 환경 구성
- **Docker**
  * nginx 컨테이너 기반 정적 리소스 배포 구성

- **Jenkins**
  * master 브랜치 푸시 시 자동 배포 파이프라인 구현

- **환경 설정 (.env 분리)**
   * `.env.local`, `.env.production` 파일을 활용해 개발/운영 환경을 분리
   * 환경 별 안전하고 유연한 배포 가능


<br/>

# 주요 기능
[⏰플랩 노티 주요 기능](https://github.com/shonseonghyun/subnoti-front-v2/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)

<br/>

# 구현 페이지
| 기능 | 화면 예시 |
|------|-----------|
| 로그인 | <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/60cb0eb7-4f58-4ca4-9946-2133412bfa82" /></div> |
| 회원가입 | <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/bc7fd0a6-b20d-479a-a7f4-424afb23d7a9" /></div> |
| 내프로필 | <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/d5ba024b-1f46-4508-a815-2f325b468c40" /></div> |
| 알림 등록 |  <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/a01c5c87-83fa-4ca8-9978-1ad74583b041" /></div> |
| 알림 리스트 |  <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/c19bfbca-aaa5-42ab-b207-51bd46d8efa9" /></div> |
| 데이터 가져오지 못한 경우 |  <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/d33bee69-0288-4bde-83f5-049cab75df91" /></div> |
| 데이터를 변경하는 요청 실패한 경우 |  <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/4ea03777-5709-4a8c-b7af-73b86efea00b" /></div> |
<br/>

# 프로젝트를 통한 배운 경험 및 소감
이전 프로젝트에서 부족했던 에러 핸들링 경험을 바탕으로, 이번에는 이를 중점적으로 개선했습니다.
<br/>
반복되는 처리 로직은 모듈화하고, React Query와 ErrorBoundary를 연동하여 쿼리 에러까지 통합적으로 관리할 수 있도록 구성했습니다. 또한 AxiosError 대응을 위해 getErrorDataByCode 유틸을 구현하여 다양한 오류 메시지를 일관되게 처리할 수 있게 했습니다.
<br/>
이를 통해 개발 생산성과 사용자 경험 모두를 개선할 수 있었고,
무엇보다 이후 프로젝트에서도 유용하게 활용할 수 있을 구조를 만들 수 있어 즐거운 경험이었습니다.
