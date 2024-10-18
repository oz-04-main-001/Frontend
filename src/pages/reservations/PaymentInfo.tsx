interface PaymentInfoProps {
  title?: string;
  text?: string;
  won?: string | number;
  divStyle?: string;
  pStyle1?: string;
  pStyle2?: string;
}

export default function PaymentInfo({
  title = '결제 정보',
  text = '객실 가격(2박)',
  divStyle = 'flex flex-col w-11/12',
  won = '34,000원',
  pStyle1 = 'text-gray-500 text-medium',
  pStyle2 = 'text-xl mr-14',
}: PaymentInfoProps) {
  return (
    <div className={divStyle}>
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="flex flex-row justify-between items-center">
        <p className={pStyle1}>{text}</p>
        <p className={pStyle2}>{won}</p>
      </div>
    </div>
  );
}
