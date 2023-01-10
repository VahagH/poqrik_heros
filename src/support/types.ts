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
  filteredColumns: ColumnProps[];
  colapseColumns?: any;
  row: any;
  idx: number;
  isSelected: number | null;
  setSelected: (idx: number) => void;
  updateData?: (data: any, id: string) => any;
  deleteData?: (id: string) => any;
  setDialog: (data: any) => void;
  setFormData: (data: any) => void;
  setEditedRow: (data: any) => void;
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
  disabled?: (row: any, dialogType: string) => boolean;
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
  updateData?: (data: any, id: string) => any;
  deleteData?: (id: string) => any;
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
  columns: ColumnProps[];
  formData: any;
  editedRow: any;
  setDialog: (data: undefined) => void;
  updateData?: (data: any, id: string) => any;
  deleteData?: (id: string) => any;
  setFormData: (data: string | number | any) => void;
  addData?: (data: any) => any;
  addSuccessCallback?: (data: any, id: string) => any;
  getData: () => void;
  setEditedRow: (data: any) => void;
}

export const DIALOG_TYPES = {
  add: "add",
  delete: "delete",
  edit: "edit",
  read: "read",
};

export const TOAST_TYPES = {
  error: "error",
  success: "success",
  warning: "warning",
};

export const STATUS_OPTION = [
  { name: "Ակտիվ", value: "active" },
  { name: "Ոչ ակտիվ", value: "inactive" },
];

export const ROLE_OPTION = [
  { name: "Ադմին", value: "admin" },
  { name: "Օգտվող", value: "user" },
];

export interface AutocolpleteType {
  name: string;
  value: string;
}

export const ROLES = { user: "user", admin: "admin" };

export interface PageProps {
  name: string;
  path: string;
  navBar?: boolean;
  component?: any;
  role?: string[];
  onClick?: () => void;
  disable?: boolean;
}
