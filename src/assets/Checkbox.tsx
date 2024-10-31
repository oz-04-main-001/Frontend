export interface CheckBox {
  id: number;
  label: string;
  check: boolean;
}

export interface CheckBoxProp {
  checkbox?: CheckBox | undefined;
  id?: number;
  label?: string;
  check?: boolean;
  bold?: boolean;
  checkList?: CheckBox[];
  onChange?: (checked: boolean, item: CheckBox) => void;
}

const Checkbox: React.FC<CheckBoxProp> = ({
  checkbox,
  id,
  label = 'Label',
  bold = false,
  checkList,
  onChange,
}) => {
  return (
    <div className="cursor-pointer">
      <label
        htmlFor={String(id)}
        className={`w-full h-6 flex items-center btn1 font-sans text-black ${bold ? 'font-bold' : 'font-normal'}`}
      >
        <input
          id={String(id)}
          type="checkbox"
          value={label}
          className="w-6 h-6 mr-2 rounded cursor-pointer accent-primary-600 checked:border-0"
          onChange={event => {
            if (onChange && checkbox) {
              onChange && onChange(event.target.checked, checkbox);
            }
          }}
          checked={checkList?.includes(checkbox!) ? true : false}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
