export enum BadgeStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  paid = 'paid',
  partially_paid = 'partially_paid',
  check_in = 'check_in',
  check_out = 'check_out',
  cancelled_by_guest = 'cancelled_by_guest',
  cancelled_by_host = 'cancelled_by_host',
  no_show = 'no_show',
  refunded = 'refunded',
  completed = 'completed',
}
interface BadgesProps {
  status: BadgeStatus;
}

const badgeStyle: { [key in BadgeStatus]: [string[], string] } = {
  [BadgeStatus.pending]: [[' bg-primary-300 text-black'], '확정대기'],
  [BadgeStatus.confirmed]: [[' bg-primary-300 text-black'], '이용예정'],
  [BadgeStatus.paid]: [[' bg-primary-300 text-black'], '보류'],
  [BadgeStatus.partially_paid]: [['bg-primary-300 text-black'], '부분결제'],
  [BadgeStatus.check_in]: [['bg-state-warn text-gray-500'], '체크인'],
  [BadgeStatus.check_out]: [['bg-state-warn text-gray-500'], '체크아웃'],
  [BadgeStatus.cancelled_by_guest]: [
    ['bg-state-err  text-black'],
    '게스트 취소',
  ],
  [BadgeStatus.cancelled_by_host]: [
    ['bg-state-err  text-black'],
    '호스트 취소',
  ],
  [BadgeStatus.no_show]: [['bg-gray-300 text-gray-700'], '노쇼'],
  [BadgeStatus.refunded]: [['bg-state-err  text-black'], '환불'],
  [BadgeStatus.completed]: [['bg-gray-300 text-gray-700'], '이용완료'],
};

export function Badges({ status }: BadgesProps) {
  console.log('Badge Status:', status);
  const badgeInfo = badgeStyle[status];
  if (!badgeInfo) {
    console.error(`Badge style not found for status: ${status}`);
    return null;
  }
  const [badgeClass, label] = badgeInfo;
  return (
    <div
      className={`${badgeClass.join(' ')} px-2 py-1 inline-block text-center rounded-md text-base font-regular`}
    >
      {label}
    </div>
  );
}

export default Badges;
