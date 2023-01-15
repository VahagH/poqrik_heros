import { CaseInputTypes } from "../../../components/CaseInput/CaseInput";
import {
  currencyFormatterDecimal,
  timeZoneDateTime,
} from "../../../support/supportFunctions";
import {
  DIALOG_TYPES,
  STATUS_OPTION,
  ASSORTMENT_OPTION,
  ColumnProps,
} from "../../../support/types";
import PopoverComponent from "../../../components/PopoverComponent";

export const columns: ColumnProps[] = [
  {
    name: "Կոդ",
    key: "code",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
    isRequired: false,
    onlyRead: true,
  },
  {
    name: "Վերնագիր",
    key: "title",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
  },
  {
    name: "Ենթավերնագիր",
    key: "subtitle",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXTAREA,
    customElement: (el: string) => (
      <PopoverComponent title={el} showDotes>
        {el}
      </PopoverComponent>
    ),
  },
  {
    name: "Տարիք",
    key: "age",
    placeHolder: "3-5",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
  },
  {
    name: "Գին",
    key: "price",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
    jsType: "number",
    mask: "99999",
    customElement: (el: any) => currencyFormatterDecimal(el),
  },
  {
    name: "Զեղջ %",
    key: "sale",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
    isRequired: false,
    customElement: (el: any) => (el ? `${el} %` : "- - -"),
    mask: "99",
    jsType: "number",
  },
  {
    name: "Տեսակ",
    key: "type",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.AUTOCOMPLETE,
    options: ASSORTMENT_OPTION,
    customElement: (el: string) => (el === "dress" ? "Տոնական" : "Կերպար"),
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
  {
    name: "Ստեղծված",
    key: "createdAt",
    customElement: (el: number) => timeZoneDateTime(el),
  },
  {
    name: "Գլխավոր նկար",
    key: "image",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.UPLOAD_IMAGES,
    hideColumnFromTable: true,
    disabled: (formData: any, dialogType) =>
      dialogType === DIALOG_TYPES.edit && typeof formData?.image === "string",
    isRequired: false,
  },
];
