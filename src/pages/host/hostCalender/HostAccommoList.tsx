import { useState } from 'react';
// import Button, { BtnType } from '../../../assets/buttons/Button';
import close from '../../../assets/icons/icon.svg';
import HostAccommodationAPI from '../../../axios/HostAccommodationAPI';
import logo from '/staynest.svg';
// import { useNavigate } from 'react-router-dom';

interface AccommodationProp {
  handleDeletePopupClick: (id: number) => void;
}
export default function HostAccommoList({
  handleDeletePopupClick,
}: AccommodationProp) {
  // const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const { accommoData } = HostAccommodationAPI();

  function onClickCloseBtn() {
    setIsShow(prev => !prev);
  }

  return (
    <>
      <div className="flex flex-row items-center text-large">
        <div className="p-2 font-bold">숙소 관리</div>
        <button
          type="button"
          onClick={onClickCloseBtn}
          className="bg-state-err w-[87px] h-7 rounded-md text-xs text-white transition duration-100 hover:scale-105 focus:opacity-85"
        >
          숙소 삭제
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-between">
        {accommoData?.map(acco => (
          <div
            key={acco.id}
            className="border-x-gray-200 mb-4 rounded-md relative flex flex-col justify-between w-64 h-auto p-2 bg-white shadow-md"
          >
            <img
              src={close}
              onClick={() => handleDeletePopupClick(acco.id)}
              alt="숙소 삭제 버튼"
              className={`relative left-56 bottom-1 w-5 h-5 transition duration-100 hover:scale-105 focus:opacity-85 ${isShow ? '' : 'hidden'}`}
            />
            {acco.image ? (
              <div className="w-full bg-gray-100 rounded-md h-28">
                <img src={acco.image} alt="숙소 이미지" />
              </div>
            ) : (
              <div>
                <img
                  src={logo}
                  alt="숙소 이미지 대체"
                  className="w-full bg-gray-100 rounded-md h-28"
                />
              </div>
            )}

            <h3 className="text-base">{acco.name}</h3>
            <p className="flex flex-wrap text-xs">
              <span>{acco.address}</span>
            </p>

            {/* <div>
              <Button
                text="수정"
                type={BtnType.line}
                onClick={() => {
                  acco.accommodation_type.includes('독채') === true
                    ? navigate(`/onlyhost/edit-Onlyroom/${acco.id}`)
                    : navigate(`/onlyhost/edit-multiroom/${acco.id}`);
                }}
              />
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}
