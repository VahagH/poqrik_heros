import { CaseInputTypes } from "../../../components/CaseInput/CaseInput";
import {
  ColumnProps,
  DIALOG_TYPES,
  ROLE_OPTION,
  STATUS_OPTION,
} from "../../../support/types";

export const columns: ColumnProps[] = [
  {
    name: "Անուն",
    key: "firstName",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
  },
  {
    name: "Ազգանուն",
    key: "lastName",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
  },
  {
    name: "Էլ․ հասցե",
    key: "email",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    disabled: (formData: any, dialogType: string) =>
      dialogType === DIALOG_TYPES.edit,
    type: CaseInputTypes.EMAIL,
  },
  {
    name: "Հեռախոսահամար",
    key: "phone",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TELEPHONE,
  },
  {
    name: "Գաղտնաբառ",
    key: "password",
    formTypes: [DIALOG_TYPES.add],
    type: CaseInputTypes.PASSWORD,
    minStringLength: 6,
    dontSend: true,
    hideColumnFromTable: true,
  },
  {
    name: "Հաստատել գաղտնաբառը",
    key: "confirmPassword",
    formTypes: [DIALOG_TYPES.add],
    type: CaseInputTypes.PASSWORD,
    confirming: true,
    minStringLength: 6,
    dontSend: true,
    hideColumnFromTable: true,
  },
  {
    name: "Դեր",
    key: "role",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.AUTOCOMPLETE,
    options: ROLE_OPTION,
    hideColumnFromTable: true,
  },
  {
    name: "Կարգավիճակ",
    key: "status",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.AUTOCOMPLETE,
    options: STATUS_OPTION,
    customElement: (el: string) => (el === "active" ? "Ակտիվ" : "Ոչ ակտիվ"),
    customStyle: (el: string) =>
      el === "active"
        ? { color: "#1DC35D", fontWeight: 600 }
        : { color: "red", fontWeight: 600 },
  },
];
