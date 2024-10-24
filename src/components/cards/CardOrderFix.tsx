import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';

interface Prop {
  accommodations?: string;
  stateroom?: string;
  checkIn?: string;
  checkOut?: string;
  user?: string;
  phoneNumber?: string;
  onClose2: () => void;
}

export default function CardOrderFix({
  accommodations = '나라마 숙소',
  stateroom = '건강 청정 황토방',
  checkIn = '2024.10.14',
  checkOut = '2024.10.15',
  user = '한기선',
  phoneNumber = '01012345678',
  onClose2,
}: Prop) {
  return (
    <div className="flex-row p-5 mx-3 my-4 bg-white border-2 border-gray-100 border-solid rounded-md">
      <div className="flex justify-between flex-col">
        <div>
          <p className="s1 inline-block mr-3">{accommodations}</p>
          <p className="s2">
            {checkIn} ~ {checkOut}
          </p>
          <p className="b2 inline-block">{stateroom}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="s2">
          <span className="b2">{user}</span> {phoneNumber}
        </p>
        <p className="b2">
          성인<span className="s2">1</span> 유아<span className="s2">1</span>
        </p>
      </div>
      <div className="flex justify-between gap-4 mt-2">
        <Button
          size={BtnSize.l}
          text="예약 확정"
          type={BtnType.normal}
          onClick={onClose2}
        />
      </div>
    </div>
  );
}
