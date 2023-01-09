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
  options?: AutocolpleteType[];
  confirming?: boolean;
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
  formTypes?: string[];
  autoFocus?: boolean;
  disabled?: boolean;
  dontSend?: boolean;
  customStyle?: any;
  onlyRead?: boolean;
  customElement?: (el: any, row: any) => any;
  rowValueKey?: string;
  rowLabelKey?: string;
  mdGrid?: any;
  options?: AutocolpleteType[];
  confirming?: boolean;
}

export interface CRUDTableProps {
  columns: ColumnProps[];
  colapseColumns?: any;
  rows: any[] | null;
  addData?: (data: any) => any;
  addSuccessCallback?: (data: any, id: string) => any;
  getData: () => void;
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
  columns: ColumnProps[];
  formData: any;
  setFormData: (data: string | number | any) => void;
  addData?: (data: any) => any;
  addSuccessCallback?: (data: any, id: string) => any;
  getData: () => void;
}

export const DIALOG_TYPES = {
  add: "add",
  delete: "delete",
  edit: "edit",
  read: "read",
};

export const STATUS_OPTION = [
  { name: "Ակտիվ", value: "active" },
  { name: "Ոչ ակտիվ", value: "inactive" },
];

export interface AutocolpleteType {
  name: string;
  value: string;
}

export const ROLES = ["user", "admin"];

export interface PageProps {
  name: string;
  path: string;
  navBar?: boolean;
  component?: any;
  role?: string[];
  onClick?: () => void;
  disable?: boolean;
}
