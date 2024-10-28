interface PaymentInfoProps {
  title?: string;
  dateCount?: number;
  price?: string | number;
}

export default function PaymentInfo({
  title,
  dateCount,
  price,
}: PaymentInfoProps) {
  return (
    <div className="flex flex-col w-1vz">
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="flex flex-row items-center justify-between mr-44">
        <p className="text-gray-500 text-medium">객실 가격{dateCount}박</p>
        <p className="text-xl">{price}원</p>
      </div>
    </div>
  );
}
