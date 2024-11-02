interface ChipsProps {
  text?: string;
  className?: string;
  value?: string | undefined;
  setValue?: (value: string) => void;
}

export default function Chips({
  className = '',
  setValue,
  value,
  text,
}: ChipsProps) {
  return (
    <a
      className={`inline-block w-full rounded-md text-gray-700 border-2 border-gray-100 border-solid ${className}`}
    >
      <input
        className={`w-full bg-inherit text-sm text-gray-400 px-5 py-6 bg-transparent focus:outline-none border-transparent border-none`}
        value={value ? value : text}
        onChange={e => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        readOnly={!value}
      />
    </a>
  );
}
