import { ChangeEventHandler } from "react";

export const Datepicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <span className='datepicker-toggle'>
      <input
        type='date'
        id='datepicker'
        value={value}
        onChange={onChange}
        className='text-gray-400 border border-gray-300 rounded-sm border-solid pt-0.5 pb-0.5 pr-1 pl-1'
      />
    </span>
  );
};
