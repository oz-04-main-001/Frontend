export default function CheckInOut({
  title = '체크인',
  date = '2025.12.02(월)',
  time = '15:00',
}) {
  return (
    <div className="grow">
      <p className="text-gray-800 b1">{title}</p>
      <p className="mt-2 s1">{date}</p>
      <p className="text-gray-700 s2">{time}</p>
    </div>
  );
}
