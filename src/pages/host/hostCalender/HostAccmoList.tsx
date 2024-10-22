import { useEffect, useState } from 'react';
import Button, { BtnType } from '../../../assets/buttons/Button';
import close from '../../../assets/icons/icon.svg';

export default function HostAccomoList({}) {
  const [isShow, setIsShow] = useState<boolean>(false);
  // const [isDelete, setIsDelete] = useState<boolean>(false);

  function onClick() {
    setIsShow(prev => {
      return !prev;
    });
  }

  useEffect(() => {}, [isShow]);

  const accomodaton = [
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
    { 숙소: '가나다 숙소', 주소: '서울특별시 성동구 성동일 124' },
  ];

  return (
    <>
      <div className="flex flex-row items-center text-large">
        <div className="p-2 font-bold">숙소 관리</div>
        <button
          type="button"
          onClick={onClick}
          className="bg-state-err w-[87px] h-7 rounded-md text-xs text-white transition duration-100 hover:scale-105 focus:opacity-85"
        >
          숙소 삭제
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-4 gap-y-3 max-w-2xl">
        {accomodaton.map((accomo, index) => (
          <div key={index} className="w-36 h-72 p-2 bg-white shadow-md">
            <button>
              <img
                src={close}
                alt="숙소 삭제 버튼"
                className={`relative left-28 w-5 h-5 transition duration-100 hover:scale-105 focus:opacity-85 ${isShow ? '' : 'hidden'}`}
              />
            </button>
            <img
              src="http://www.w3.org/2000/svg"
              alt="숙소 이미지 대체"
              className="w-full h-32 bg-gray-100 rounded-md"
              rounded-lg
            />
            <h3 className="text-large">{accomo.숙소}</h3>
            <p>{accomo.주소}</p>
            <Button text="수정" type={BtnType.line} />
          </div>
        ))}
      </div>
    </>
  );
}
