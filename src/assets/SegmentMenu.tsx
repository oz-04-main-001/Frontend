interface Props {
  taps: string[];
  active: number;
  setActive: (idx: number) => void;
}
export default function SegmentMenu({ taps, active, setActive }: Props) {
  return (
    <div className="flex overflow-hidden text-center text-gray-700 bg-gray-300 rounded-md s2">
      {taps.map((tap, idx) => {
        return (
          <div
            className={`py-2 rounded-md grow flex justify-center content-center ${
              active === idx ? ' text-gray-800 bg-gray-200 s1' : 'mt-px'
            }`}
            key={idx}
            onClick={() => {
              setActive(idx);
            }}
          >
            {tap}
          </div>
        );
      })}
    </div>
  );
}
