//텍스트 형태

interface InfoTempProp {
  title: string;
  text: string;
}

export default function InfoTemp({
  title = 'title',
  text = 'text',
}: InfoTempProp) {
  return (
    <div className="mb-12">
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="text-black s1">{text}</div>
    </div>
  );
}
