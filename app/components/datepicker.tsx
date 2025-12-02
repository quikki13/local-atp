import { ChangeEventHandler } from "react";

export const Datepicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <span className='datepicker-toggle'>
      <input
        type='date'
        id='datepicker'
        value={value}
        onChange={onChange}
        className='text-gray-400 border-1 border-gray-300 rounded-sm border-solid pt-[2px] pb-[2px] pr-[4px] pl-[4px]'
      />
    </span>
  );
};
