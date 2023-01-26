export interface CaseInputProps {
  onChange: (key: string, value: string | number | any) => void;
  onChangeFunc?: (formData: any, zis: any) => any;
  formData?: any;
  name: string;
  label: string;
  value: string | number | [] | any;
  type?: string;
  isRequired?: boolean;
  minStringLength?: number;
  fullWidth?: boolean;
  mask?: any;
  multiple?: boolean;
  autoFocus?: boolean;
  placeHolder?: string;
  jsType?: string;
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
  shortName?: string;
  key: string;
  type?: string;
  isRequired?: boolean;
  minStringLength?: number;
  hideColumnFromTable?: boolean;
  filterable?: boolean;
  fullWidth?: boolean;
  mask?: any;
  multiple?: boolean;
  formTypes?: string[];
  jsType?: string;
  autoFocus?: boolean;
  placeHolder?: string;
  dontSend?: boolean;
  customStyle?: any;
  onlyRead?: boolean;
  rowValueKey?: string;
  rowLabelKey?: string;
  mdGrid?: any;
  options?: AutocolpleteType[];
  confirming?: boolean;
  onChangeFunc?: (formData: any, zis: any) => any;
  disabled?: (formData: any, dialogType: string, row: any) => boolean;
  customElement?: (el: any, row: any) => any;
  hideInputFromDialog?: (
    formData: any,
    handleChange: any,
    role: string
  ) => boolean;
}

export interface CRUDTableProps {
  columns: ColumnProps[];
  colapseColumns?: any;
  rows: any[] | null;
  validate?: (formData: any, setInputError: (data: any) => void) => boolean;
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
  validate?: (formData: any, setInputError: (data: any) => void) => boolean;
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

export const RESERV_STATUS_OPTION = [
  { name: "Ամրագրված", value: "reserved" },
  { name: "Վերցված", value: "taken" },
  { name: "Ստացված", value: "received" },
  { name: "Չեղարկված", value: "cancelled" },
];

export const ASSORTMENT_OPTION = [
  { name: "Տոնական", value: "dress" },
  { name: "Կերպար", value: "shape" },
];

export const ROLE_OPTION = [
  { name: "Ադմին", value: "admin" },
  { name: "Օգտվող", value: "user" },
];

export const COLORS = [
  { name: "Սպիտակ", value: "white" },
  { name: "Կապույտ", value: "blue" },
  { name: "Մոխրագույն", value: "gray" },
  { name: "Վարդագույն", value: "pink" },
  { name: "Կարմիր", value: "red" },
  { name: "Դեղին", value: "yellow" },
  { name: "Մանուշակագույն", value: "purple" },
  { name: "Կանաչ", value: "green" },
  { name: "Նեոն", value: "neon" },
  { name: "Սև", value: "black" },
  { name: "Մարմնագույն", value: "beige" },
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
