import { Input } from './assets/input'; // Input 컴포넌트를 가져옵니다.

const Logo = () => (
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold">로고</h1>
  </div>
);

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Logo /> {/* 로고 컴포넌트 추가 */}
      
      {/* 회원가입 */}
      <div className="w-full max-w-[400px] flex flex-col">
        {/* 회원가입을 클릭하면 로그인 페이지로 이동하는 기능 추가 예정 */}
        <h2 className="text-lg font-bold text-left mb-4">⬅️ 회원가입</h2>

       {/* 이메일 */}
        <label className="text-sm font-regular mb-1 text-left">이메일</label>
        <div className="flex items-center">
        <Input
            type="text"
            id="email"
            placeholder="이메일"
            className="w-[50%] h-[38px] border border-basic-400 rounded-md mr-2" // 높이 조정
        />
        <span className="text-sm h-[38px] flex items-center"> @ </span> {/* @ 기호 표시 및 수직 정렬 */}
        <select
            className="w-[40%] h-[38px] border border-basic-400 rounded-md p-2 text-sm"
            id="domain" // 도메인 선택
        >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            {/* 다른 도메인 옵션 추가 가능 */}
        </select>
        </div>


        {/* 비밀번호 */}
        <label className="text-sm font-regular mt-4 text-left">비밀번호</label>
        <Input type="password" id="password" placeholder="비밀번호" />
        <p className="text-red-500 text-sm mt-1">
          문자 길이 8자, 첫 글자 대문자, 숫자 포함, 연속 숫자 금지, 특수문자 포함 (!@#$%^&*)
        </p>

        {/* 비밀번호 확인 */}
        <label className="text-sm font-regular mt-4 text-left">비밀번호 확인</label>
        <Input type="password" id="confirm-password" placeholder="비밀번호 확인" />
        {/* 비밀번호 확인의 에러 처리는 Input 컴포넌트가 처리 */}

        {/* 이름 */}
        <label className="text-sm font-regular mt-4 text-left">이름</label>
        <div className="flex justify-between">
          <Input type="text" id="last-name" placeholder="성" className="mr-2" />
          <Input type="text" id="first-name" placeholder="이름" className="ml-2" />
        </div>

        {/* 생년월일 */}
        <label className="text-sm font-regular mt-4 text-left">생년월일</label>
        <Input type="text" id="birthday" placeholder="YYYYMMDD" />

        {/* 성별 */}
        <label className="text-sm font-regular mt-4 text-left">성별</label>
        <div className="flex justify-between">
          <button className="w-[48%] h-[38px] bg-blue-500 text-white rounded-md">남자</button>
          <button className="w-[48%] h-[38px] bg-blue-500 text-white rounded-md">여자</button>
        </div>

        {/* 전화번호 */}
        <label className="text-sm font-regular mt-4 text-left">전화번호</label>
        <div className="flex justify-between">
          <Input type="text" id="phone" placeholder="010" className="mr-2" />
          <Input type="text" id="phone-middle" placeholder="4자리" className="mx-2" />
          <Input type="text" id="phone-last" placeholder="4자리" className="ml-2" />
        </div>

        {/* 개인정보 동의 */}
        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">개인정보 이용 동의</span>
        </div>

        {/* 회원가입 버튼 */}
        <div className="mt-6">
          {/* 버튼 컴포넌트 추가 */}
          <button className="w-full h-[38px] bg-blue-500 text-white rounded-md">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default App;
