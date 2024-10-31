interface RefundNoticeProps {
  titleStyle?: string; 
}

export default function RefundNotice({ titleStyle = '' }: RefundNoticeProps) {
  return (
    <div>
      <p className={`mt-5 ${titleStyle} font-bold text-large text-gray-500`}>
        취소 및 환불규정
      </p>
      <p className="text-medium">
        객실별 취소 정책이 상이하니 객실 상세정보에서 확인해주세요.
      </p>
    </div>
  );
}