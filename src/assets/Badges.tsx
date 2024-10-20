// 상민

export enum BadgeStatus {
  '예정',
  '이용중',
  '완료',
  '취소',
}
interface BadgesProps {
  label: string;
  status: BadgeStatus;
}

// Badges 컴포넌트 정의
export function Badges({ label, status }: BadgesProps) {
  const badgeClasses: { [key: string]: string } = {
    0: 'w-[70px] h-[26px] bg-primary-300',
    1: 'w-[57px] h-[26px] bg-state-warn',
    2: 'w-[70px] h-[26px] bg-gray-300',
    3: 'w-[57px] h-[26px] bg-state-err',
  };

  return (
    <div
      className={`${badgeClasses[status]} flex items-center justify-center rounded-md text-base font-regular`}
    >
      {label}
    </div>
  );
}

export default Badges;
