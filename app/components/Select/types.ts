
import { Select as RadixSelect } from "@radix-ui/themes";

export interface ISelect extends RadixSelect.RootProps {
  children: React.ReactNode;
  placeholder?: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}