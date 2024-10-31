interface CheckInOutProp {
  title: string;
  date: string;
}

export default function CheckInOut({ title, date }: CheckInOutProp) {
  const checkInfo = () => {
    return date.split(' ');
  };
  return (
    <div className="grow">
      <p className="text-gray-800 b1">{title}</p>
      <p className="mt-2 s1">{checkInfo()[0]}</p>
      <p className="text-gray-700 s2">{checkInfo()[1]}</p>
    </div>
  );
}
