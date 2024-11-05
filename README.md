# 숙박등록, 예약 서비스 STAYNEST

메인 레포 : https://github.com/oz-04-main-001
배포 URL :
Test ID : admin@naver.com, guest@naver.com, host@naver.com
Test PW : 12345678

## 프로젝트 소개

Staynest는 호스트가 손쉽게 숙소와 객실을 등록하고, 유저가 다양한 숙소 옵션을 찾아 예약할 수 있는 플랫폼입니다. 에어비앤비나 아고다와 유사하게, 사용자는 다양한 위치와 스타일의 숙소를 탐색하고 원하는 일정을 선택해 간편하게 예약할 수 있습니다. 또한, 예약 취소 기능을 통해 유연한 일정 조율이 가능합니다.

## 팀원 구성

| 한기선(FE)                                                                                    | 이상민(FE)                                                                                           | 손수민(FE)                                                                                    | 김예진(FE)                                                                                     |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| <img src ="https://avatars.githubusercontent.com/u/176655935?v=4" width=200> <br /> @kiseon77 | <img src ="https://avatars.githubusercontent.com/u/146797468?v=4" width=200> <br /> @sangmin0310-afk | <img src ="https://avatars.githubusercontent.com/u/174682226?v=4" width=200> <br /> @SOOMin13 | <img src ="https://avatars.githubusercontent.com/u/174327543?v=4" width=200> <br /> @dnwjd0218 |

## 1. 개발환경

Front : React, TypeScript, Tailwind CSS, Axios, Zustand <br />
배포환경 : AWS<br />
버전 및 이슈관리 : Github, Github Issues <br />
협업 툴 : Discord, Notion <br />
디자인 : Figma

## 2. 채택한 개발 기술과 브랜치 전략

### Vite - 빠른 개발 환경 설정 도구

- 이점: 빠른 번들링과 핫 리로딩 기능을 제공하여 개발 속도를 높여줍니다. 초기 로딩이 빠르고, 경량화된 빌드 결과물을 생성할 수 있습니다.
- 사용 이유: Vite는 React와 TypeScript 프로젝트에 최적화되어 있으며, 빠른 피드백 루프를 통해 생산성을 크게 향상시킵니다.

### React - UI 라이브러리

- 이점: 컴포넌트 기반 아키텍처 덕분에 UI를 재사용 가능한 컴포넌트로 나눌 수 있습니다. 이를 통해 코드의 재사용성이 높아지고 유지 보수가 용이해집니다.
- 사용 이유: 빠르게 UI를 만들고 관리하기 적합하여, 데이터와 상호작용하는 동적인 예약 사이트의 개발에 최적입니다.

### TypeScript - 정적 타입 시스템

- 이점: 변수나 함수에 타입을 미리 지정하여 코드의 안정성을 높이고, 에러를 사전에 방지할 수 있습니다. IDE에서 자동 완성, 타입 오류 체크 등의 지원이 강화됩니다.
- 사용 이유: 대규모 프로젝트일수록 타입 안정성이 중요합니다. 타입스크립트를 사용하면 코드가 복잡해질 때 타입 에러를 쉽게 찾을 수 있어 협업과 유지 보수에도 유리합니다.

### Tailwind CSS - 유틸리티 기반 CSS 프레임워크

- 이점: 클래스 이름으로 스타일을 직접 지정하는 방식으로 CSS를 작성하는 번거로움을 줄여주며, 일관된 디자인 시스템을 유지할 수 있습니다.
- 사용 이유: 다양한 스타일 조합을 빠르게 시도해 볼 수 있고, 컴포넌트에 맞춤화된 UI를 구현하는 데 유용하여 사용자 경험이 중요한 숙박 예약 사이트에 적합합니다.

### Axios - HTTP 클라이언트 라이브러리

- 이점: 비동기 데이터 요청과 응답 처리가 쉽고, 요청에 대한 오류 핸들링을 효율적으로 관리할 수 있습니다. API 요청 시 데이터 변환이나 헤더 설정을 간단하게 할 수 있습니다.
- 사용 이유: 예약 사이트는 서버와의 데이터 통신이 많기 때문에, Axios로 예약 정보나 사용자 데이터를 관리하면 비동기 작업을 안정적으로 처리할 수 있습니다.

### Zustand - 상태 관리 라이브러리

- 이점: 간단한 API와 가벼운 구조로 필요한 상태만 관리할 수 있어 프로젝트의 성능을 높입니다. 전역 상태를 효율적으로 다루며, 사용법이 간단하고 빠릅니다.
- 사용 이유: 예약 사이트에서는 예약 상태, 로그인 상태 등 전역에서 공유할 데이터가 많습니다. Zustand를 사용하면 복잡한 상태 관리 없이 전역 상태를 손쉽게 다룰 수 있어 개발 생산성이 향상됩니다.
  이 스택 조합은 빠르고 유지보수성 높은 코드를 작성할 수 있게 하여, 사용자에게 최적의 경험을 제공하는 숙박 예약 사이트 개발에 적합합니다.

### 브랜치 전략

Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
main 브랜치는 배포 단계에서만 사용하는 브랜치입니다.

featuer 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

## 3. 프로젝트 프론트엔드 구조

## 4. 역할분담

### 한기선 (부팀장)

- <b>UI</b>
  - 페이지 :
  - 공통 컴포넌트 :
- <b>기능</b>

### 김예진

- <b>UI</b>
  - 페이지 : 독채 숙소/객실 등록, 객실 여러개인 숙소/객실 등록
  - 공통 컴포넌트 : 숙소 정보, 사진, 이용입력 컴포넌트 - Input, Button, InputChips, Counter 컴포넌트
- <b>기능</b>
   - 독채 숙소 사진, 정보, 이용정보가 모두 입력되면 성공적으로 객실 등록 페이지로 이동합니다. 
   - 독채 객실 이용정보가 모두 입력되면 성공적으로 예약관리 페이지로 이동합니다.
   - 객실이 여러개인 숙소 사진, 정보, 이용 정보가 모두 입력되면 성공적으로 객실 등록 페이지로 이동합니다.
   - 해당 객실에 대한 숙소의 간단한 정보가 뜨며, 객실 사진, 정보, 이용 정보가 모두 입력되면 성공적으로 예약관리 페이지로 이동합니다. 

### 이상민

- <b>UI</b>
  - 페이지 : 로그인, 로그아웃, 회원가입, 이메일인증, 숙소유형선택(독체, 일반), 숙소건물유형선택
  - 공통 컴포넌트 :입력창, 벳지(이용예정, 이용중, 이용완료, 취소)
- <b>기능</b>
  - 로그인: TestId, 비밀번호를 작성하면 이정보를 토대로 서버에게 전달 그러고 서버에서 access_token을 전달 로컬스토리지에 auth_token이라고 저장, 토큰만료시 만료된 토큰과 요청을 서버에 전달 서버에서 refresh토큰 전달 재발급으로 로컬스토리지에 저장, refresh토큰이 만료되면 로그인 페이지로 리다이렉트 합니다.
  - 회원가입: 회원가입을 하는 사용자의 정보(이메일, 비밀번호(비밀번호 확인), 이름(성, 이름), 성별, 전화번호,개인정보동의(체크박스) 를 회원가입 버튼을 누를 시 서버에 전달, 서버에서 이메일 인증을 위해 OTP를 이메일에 전달
  - 이메일인증: 이메일인증을 위해 이메일과 OTP작성후 인증요청을 한 후, 인증이 완료가 되면 인증 로그인 페이지로 이동합니다.
  - 로그아웃: 로그아웃 라벨을 클릭 을 하면, 로그아웃 하시겠습니까? 라는 팝업을 띄우고 확인이 되면, 로그아웃이 되고 저장되어있는 access_token을 삭제합니다.
  - 숙소유형선택(독체, 일반): 하나의 숙소를 한팀이 전부 사용해요(독체), 하나의 숙소에 객실이 여러개 있어요(일반), 둘중에 하나를 선택하면, 선택한 상태를 전역으로 관리해서 건물유형선택에 전달
  - 숙소건물유형선택: '펜션','아파트','빌라','단독주택','호텔','아파트2','빌라2' 일반인지, 독체인지에 대한 상태에 따라, 예) 독체펜션 or 펜션 으로 전역 상태로 저장하게 됩니다.

### 손수민

- <b>UI</b>
  - 페이지 : 호스트 예약 총괄 페이지 (Host Main)
  - 공통 컴포넌트 : Popup 컴포넌트
- <b>기능</b>
  - 호스트 예약 총괄 페이지 (Host Main)

  1. 캘린더
     - 특정 일자에 존재하는 체크인 예정 예약과 숙박중인 예약의 총 건수를 확인할 수 있습니다.
     - 월 단위의 캘린더로써 현재 날짜 표시 기능, 이전달/현재달/다음달 이동 기능이 구현되어 있습니다.
     - 예약이 존재하는 특정 일자 클릭 시, 예약관리 사이드 바에 해당 일자의 이용 요청 상태인 예약과 예약 확정된 예약을 확인할 수 있습니다.
  2. 예약 관리 사이드 바

     - 캘린더에서 일자 클릭 시, 클릭한 날짜가 예약관리 사이드 바 상단에 표시됩니다.
     - 이용 요청 탭과 예약 확정 탭에서 각각 해당 일자의 이용 요청 상태인 예약과 예약 확정된 예약 확인 가능합니다.
     - 해당 일자의 특정 탭에 존재하는 숙소 목록과 목록에 따른 필터링을 제공합니다.(드롭다운 형태)
     - 이용 요청 탭에서는 예약 취소/예약 확정 기능을. 예약 확정 탭에서는 예약 취소 기능을 제공합니다.
     - 예약 취소 및 확정 버튼 클릭 시, 팝업 창이 뜨며, 해당 팝업에서 최종적으로 예약 취소/확정이 가능합니다.

  3. 숙소 관리
     - 호스트가 관리하고 있는 숙소 목록을 제공합니다.
     - 삭제하기 버튼 클릭 시, 삭제 버튼이 활성화되며, 삭제 버튼 클릭 시에 팝업 창을 통해 최종 삭제가 가능합니다.
     - 수정 버튼 클릭 시, 숙소 편집 페이지로 이동합니다.

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-10-10 ~ 2024-11-06
- 기획 :2024-10-10 ~ 2024-10-14
- UI 구현 : 2024-10-14 ~ 2024-10-22
- 기능 구현 : 2024-10-20 ~ 2024-11-03

### 작업 관리

GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
데일리스크럼을 진행하며 작업 순서와 방향성에 대한 고민을 나누었습니다.

## 6. 페이지 별 기능

## 7. 트러블 슈팅

이상민: 공통컴포넌트에 대한 부분의 사용에 에러발생,
const defaultWidth = 'max-w-[600px] min-w-[170px]';,
회원가입 입력창의 각각의 크기를 맞추기가 어려워짐,
className="flex-grow min-w-[80px] max-w-[110px]"
flex-grow = flex 컨테이너 내에서 flex 아이템이 사용 가능한 공간을 얼마나 차지할지를 결정합니다.
각각의 인풋창 크기를 지정해서 크기를 지정해 오류 부분을 해결했습니다.

## 8. 프로젝트 후기

### 한기선 (부팀장)

### 김예진

### 이상민

프로젝트를 함에 있어서 저의 능력이 어느정도 까지 알고 있고 저의 역량에 어떠한 부분이 부족한지 알게 되었고
팀원과의 작업을 통해 어떻게 팀이 좀 더효율적으로 일을 할 수 있을지 어떻게 벡엔드와 어떻게 소통을 해야 맞춰갈 수 있는지 알게 되었습니다.

### 손수민
이번 프로젝트 경험으로 전반적인 프로젝트의 플로우가 어떤 식으로 흘러가는지 배웠고, 다양한 사람과 협업하는 방법에 대해서도 배우게 되었습니다. 
공통 컴포넌트와 같이 많은 사람들이 다양한 환경에서 하나의 컴포넌트를 활용해야 할 때에는 무작정 코드를 짜는 것이 아닌, 계획 하에 작업을 해야하고, 내가 작업한 결과물에 대한 설명도 필요하다는 것을 경험적으로 배운 시간이었습니다. 
부족한 점을 발견할 수 있었고 이를 발전의 계기로 삼을 수 있는 소중한 시간이었습니다.
