import React from 'react';
import { Input } from '../../assets/Input';
import Button, { BtnSize, BtnType } from '../../assets/buttons/button'; // Button 컴포넌트 import

const SignUp: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[500px]">
      <div className="mb-8 flex justify-center items-center">
        <img src="/public/staynest.svg" alt="로고" width="60" height="60" />
      </div>
      <h1 className="mb-6 text-2xl font-bold">&lt; 회원가입</h1>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이메일
          </label>
          <div className="flex h-[38px]">
            <Input
              type="text"
              id="email"
              placeholder="이메일"
              className="w-[330px] rounded-l-md rounded-r-none"
            />
            <span className="flex items-center justify-center px-2 bg-gray-100 border border-gray-300">
              @
            </span>
            <select className="w-[150px] h-full px-2 border border-gray-300 rounded-r-md appearance-none text-gray-300">
              <option value="" className="text-gray-300">
                {' '}
                🔽선택
              </option>
              <option value="naver.com" className="text-gray-700">
                naver.com
              </option>
              <option value="gmail.com" className="text-gray-700">
                gmail.com
              </option>
            </select>
          </div>
        </div>

        <Input
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호"
        />
        <p className="mt-1 text-xs text-state-err">
          문자길이 8글자, (첫글자 대문자) 영문, 숫자 1개 무조건 쓰기, 연속
          숫자금지) 숫자, (!@#$%^&* 1개 이상)특수문자 포함
        </p>

        <Input
          type="password"
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이름
          </label>
          <div className="flex justify-between">
            <div className="w-[230px]">
              <Input type="text" id="lastName" placeholder="성" />
            </div>
            <div className="w-[230px]">
              <Input type="text" id="firstName" placeholder="이름" />
            </div>
          </div>
        </div>

        <Input
          type="text"
          id="birthdate"
          label="생년월일"
          placeholder="생년월일 8자리"
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            성별
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className="w-1/2 h-[38px] px-4 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600"
            >
              남자
            </button>
            <button
              type="button"
              className="w-1/2 h-[38px] px-4 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-600"
            >
              여자
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            전화번호
          </label>
          <div className="flex items-center space-x-2">
            <select
              className="w-[100px] h-[38px] px-2 border border-gray-300 rounded-md appearance-none text-gray-300 box-border mb-1"
              style={{ transform: 'translateY(-6px)' }} // 약간 위로 올림
            >
              <option value="" className="text-gray-300">
                {' '}
                🔽선택
              </option>
              <option value="010" className="text-gray-700">
                010
              </option>
              <option value="02" className="text-gray-700">
                02
              </option>
              <option value="031" className="text-gray-700">
                031
              </option>
            </select>
            <Input
              type="text"
              id="phoneMiddle"
              placeholder="4자리"
              className="w-[180px] box-border"
              height="h-[38px]"
            />
            <Input
              type="text"
              id="phoneLast"
              placeholder="4자리"
              className="w-[180px] box-border"
              height="h-[38px]"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="agreement" className="mr-2" />
          <label htmlFor="agreement" className="text-sm text-gray-700">
            개인정보 이용 동의
          </label>
        </div>

        <div className="flex justify-center mt-6">
          {/* 기존 버튼을 Button 컴포넌트로 변경 */}
          <Button
            size={BtnSize.l} // 버튼 크기 설정
            text="회원가입" // 버튼 텍스트
            type={BtnType.normal} // 버튼 유형 설정
            className="w-full max-w-[400px]" // 추가적인 클래스 설정
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
