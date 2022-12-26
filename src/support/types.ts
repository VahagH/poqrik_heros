export interface CaseInputProps {
  onChange: (key: string, value: string | number | any) => void;
  name: string;
  label: string;
  value: string | number | [] | any;
  type?: string;
  isRequired?: boolean;
  minStringLength?: number;
  fullWidth?: boolean;
  autoFocus?: boolean;
  helperText?: string | null;
  disabled?: boolean;
  error?: boolean;
  onlyRead?: boolean;
}

export interface CRUDTableRowProps {
  columns: ColumnProps[];
  colapseColumns?: any;
  row: any;
  idx: number;
  isSelected: number | null;
  setSelected: (idx: number) => void;
}

export interface ColumnProps {
  name: string;
  key: string;
  type?: string;
  isRequired?: boolean;
  minStringLength?: number;
  hideColumnFromTable?: boolean;
  filterable?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  onlyRead?: boolean;
  customElement?: (el: any, row: any) => any;
  rowValueKey?: string;
  rowLabelKey?: string;
}

export interface CRUDTableProps {
  columns: ColumnProps[];
  colapseColumns?: any;
  rows: any[] | null;
  addData?: (data: any) => void;
}
export interface DialogProps {
  dialogType: string;
  dialogTitle: string;
  dialogSubtitle?: string;
  open: boolean;
  dialogWidth?: any;
}
export interface CRUDDialogProps {
  dialog: DialogProps | undefined;
  setDialog: (data: undefined) => void;
}

export const DIALOG_TYPES = {
  add: "add",
  delete: "delete",
  edit: "edit",
  read: "read",
};
