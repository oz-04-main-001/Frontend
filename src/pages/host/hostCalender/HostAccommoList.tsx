import { useState } from 'react';
import Button, { BtnType } from '../../../assets/buttons/Button';
import close from '../../../assets/icons/icon.svg';
import AccommodationAPI from '../managementAPI/AccommodationAPI';
import logo from '/staynest.svg';

interface AccommodationProp {
  handleDeleteClick: (id: number) => void;
}
export default function HostAccommoList({
  handleDeleteClick,
}: AccommodationProp) {
  const [isShow, setIsShow] = useState(false);
  // const [isDeleted, setIsDeleted] = useState(false);
  // const [deletePopup, setDeletePopup] = useState(false);
  const { data } = AccommodationAPI();

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
      <div className="flex flex-row flex-wrap justify-around gap-4 max-w-2xl">
        {data.map(acco => (
          <div
            key={acco.id}
            className="relative w-64 h-auto p-2 bg-white shadow-md flex flex-col justify-between"
          >
            <img
              src={close}
              onClick={() => handleDeleteClick(acco.id)}
              alt="숙소 삭제 버튼"
              className={`relative left-56 bottom-1 w-5 h-5 transition duration-100 hover:scale-105 focus:opacity-85 ${isShow ? '' : 'hidden'}`}
            />
            {acco.images[0] ? (
              <div className="w-full h-28 bg-gray-100 rounded-md">
                <img src={acco.images[0]} alt="숙소 이미지" />
              </div>
            ) : (
              <div>
                <img
                  src={logo}
                  alt="숙소 이미지 대체"
                  className="w-full h-28 bg-gray-100 rounded-md"
                />
              </div>
            )}
            <h3 className="text-base">{acco.name}</h3>
            <p className="text-xs flex flex-wrap">
              {acco.gps_info.city} {acco.gps_info.states}
              {acco.gps_info.road_name}
            </p>
            <Button text="수정" type={BtnType.line} />
          </div>
        ))}
      </div>
    </>
  );
}
