export interface CaseInputProps {
  onChange: (key: string, value: string | number | any) => void;
  name: string;
  label: string;
  value: string | number | [] | any;
  type: string;
  isRequired?: boolean;
  minStringLength?: number;
  fullWidth?: boolean;
  autoFocus?: boolean;
  helperText?: string | null;
  disabled?: boolean;
  error?: boolean;
  onlyRead?: boolean;
}
export interface ColumnProps {
  name: string;
  key: string;
  type: string;
  isRequired?: boolean;
  minStringLength?: number;
  fullWidth?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  onlyRead?: boolean;
}
