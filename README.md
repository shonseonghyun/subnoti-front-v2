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
    -  렌더링 에러 대응 및 사용자 친화적 예외 처리 구현

    - 



  * styled-Components
     


  * React-hook-form
    - 필요한 데이터들을 모두 useState 로 관리하자니 불필요한 랜더링 발생
    - 사용하면서 느낀 장점은 불필요한 랜더링 방지,데이터 추적 및 유효성 검사, 코드 양이 현저히 감소 등
        
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
__[회원가입]__
<p>
 <img width="288" alt="Image" src="https://github.com/user-attachments/assets/bc7fd0a6-b20d-479a-a7f4-424afb23d7a9" />
</p>

__[로그인]__
<p>
 <img width="462" alt="Image" src="https://github.com/user-attachments/assets/f84df1cf-96e8-4402-9f49-4db4f3150a10" />
</p>

__[내프로필]__
<p>
 <img width="287" alt="Image" src="https://github.com/user-attachments/assets/d5ba024b-1f46-4508-a815-2f325b468c40" />
</p>

__[노티 등록]__
<p>
 <img width="296" alt="Image" src="https://github.com/user-attachments/assets/a01c5c87-83fa-4ca8-9978-1ad74583b041" />
</p>

__[노티 리스트]__
<p>
 <img width="293" alt="Image" src="https://github.com/user-attachments/assets/c19bfbca-aaa5-42ab-b207-51bd46d8efa9" />
</p>

<br/>

# 개선 사항

<br/>

# 프로젝트를 통한 배운 경험 및 소감

