# ⏰ 플랩노티
```
 개인이 원하는 시간대의 플랩풋볼 매치에 대한 무료 참가 신청 활성화 시 알림을 보내주는 서비스
```
<br/>


# 📆 개발 기간 / 개발 인원
2024.12 ~ 현재 / 1 명

<br/>

# ⚙ 개발 환경 및 사용 기술
- Visual Studio Code
- React
  * Zustand
    - 사용자 인증 정보 전역 관리 및 접근 제어 UI 구현
    - React Query의 mutation에 대한 글로벌 로딩 상태 관리를 통해 일관된 사용자 경험을 제공하는 UI 구현
   
  * Axios
    -  API와 통신을 위한 HTTP 클라이언트
    -  Intercpetor 등록하여 요청/응답 전후 필요한 작업 수행(ex. 헤더 세팅,토큰 만료 시 재발급 진행 등)
    -  Axios 에러 코드에 대한 공통 처리 유틸 구현
 
  * React Query
    - 커스텀 훅 구조를 도입해 API 요청의 비동기 처리를 일관되고 효율적으로 관리
    - QueryClient와 커스텀 훅에 공통 옵션을 적용하여 로딩 상태, 에러 발생, 성공 처리 흐름을 통합

  * React Error Boundary
    -  렌더링 중 발생할 수 있는 예외를 사용자에게 친절하게 안내하고, 복구 가능한 구조로 구성
    -  React Query의 에러 경계 처리를 연동해, 페이지 단위에서 발생하는 예외를 사용자 친화적인 메시지와 함께 처리


  * styled-Components
    - Props를 활용한 동적 스타일링
      

  * React-hook-form
    - 데이터 추적 및 유효성 검사, 코드 양이 현저히 감소
    - 최소한의 리렌더링으로 성능을 최적화 및 사용자 입력에 대한 실시간 검증과 메시지 출력을 통해 UX 개선

        
- AWS EC2
- Docker
  * nginx 컨테이너를 띄워 배포  
- Jenkins
  * master 브랜치 푸쉬 시 자동배포 구현

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
| 에러 페이지 |  <div align="center"><img width="200" alt="Image" src="https://github.com/user-attachments/assets/d33bee69-0288-4bde-83f5-049cab75df91" /></div> |

<br/>

