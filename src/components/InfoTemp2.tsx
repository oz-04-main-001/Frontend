//리스트 형태

interface InfoTempProp {
  title: string;
  texts: string[];
}

export default function InfoTemp({
  title = 'title',
  texts = ['text', 'text'],
}: InfoTempProp) {
  return (
    <div className="mb-12">
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="grid grid-cols-5 text-black s1">
        {texts?.map(text => <div key={text}>{text}</div>)}
      </div>
    </div>
  );
}
