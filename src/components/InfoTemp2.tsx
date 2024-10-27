import { Amenity } from '../stores/useAccommodationsStore';
import { StateRoomOption } from '../stores/useStateroomStore';
interface InfoTempProp {
  title: string;
  texts: Amenity[] | StateRoomOption[];
}

export default function InfoTemp({ title, texts }: InfoTempProp) {
  return (
    <div className="mb-12">
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="grid grid-cols-5 mb-4 text-gray-500">
        {texts?.map((text, idx) => {
          return <div key={idx}>{Object.keys(text)[idx]}</div>;
        })}
      </div>
    </div>
  );
}
