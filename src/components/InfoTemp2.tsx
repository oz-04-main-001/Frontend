interface InfoTempProp {
  title: string;
  texts: { name: string }[];
}

export default function InfoTemp({ title, texts }: InfoTempProp) {
  return (
    <div className="mb-12">
      <h6 className="mb-4 text-gray-500">{title}</h6>
      <div className="grid grid-cols-5 mb-4 text-gray-500">
        {texts?.map((text, idx) =>
          'name' in text ? <div key={idx}>{text.name}</div> : null
        )}
      </div>
    </div>
  );
}
