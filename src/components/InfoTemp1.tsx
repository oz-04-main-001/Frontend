//텍스트 형태

interface InfoTempProp {
  title: string;
  text: string;
  divStyle?: string;
  divStyle2?: string;
}

export default function InfoTemp({
  title = 'title',
  text = 'text',
  divStyle = 'mb-12',
  divStyle2 = 'mb-4 text-gray-500',
}: InfoTempProp) {
  return (
    <div className={divStyle}>
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className={divStyle2}>{text}</div>
    </div>
  );
}
