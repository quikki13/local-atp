import { Select as RadixSelect } from "@radix-ui/themes";
import { ISelect } from './types';

export const Select: React.FunctionComponent<ISelect> = ({ children, label, onChange, placeholder, value, ...props }) => {
  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onChange}
      {...props}
    >
      <RadixSelect.Trigger placeholder={placeholder ? placeholder : 'Please fill the field'} />
      <RadixSelect.Content side="right">
        <RadixSelect.Group>
          <RadixSelect.Label>{label}</RadixSelect.Label>
          {children}
        </RadixSelect.Group>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};