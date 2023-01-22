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
  COLORS,
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
    name: "Նշումներ",
    key: "notes",
    hideColumnFromTable: true,
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
    isRequired: false,
  },
  {
    name: "Վերնագիր",
    key: "title",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
    isRequired: false,
  },
  {
    name: "Ենթավերնագիր",
    key: "subtitle",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXTAREA,
    isRequired: false,
    customElement: (el: string) => (
      <PopoverComponent title={el} showDotes>
        {el}
      </PopoverComponent>
    ),
  },
  {
    name: "Տարիք",
    key: "minAge",
    mask: "99",
    jsType: "number",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
  },
  {
    name: "մաքս․ Տարիք",
    shortName: "մաքս․",
    key: "maxAge",
    mask: "99",
    jsType: "number",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
    isRequired: false,
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
    name: "Գույն",
    key: "color",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.AUTOCOMPLETE,
    options: COLORS,
    hideColumnFromTable: true,
    hideInputFromDialog(formData, setFormData) {
      if (formData?.type && formData.type === "shape") {
        setFormData((prev: any) => ({ ...prev, color: null }));
        return true;
      }
      return false;
    },
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
        : { color: "rgb(233, 100, 100)", fontWeight: 600 },
  },
  {
    name: "Ստեղծված",
    key: "createdAt",
    customElement: (el: number) => timeZoneDateTime(el),
  },
  {
    name: "Բառ կոդ",
    key: "barCode",
    hideColumnFromTable: true,
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXTAREA,
    isRequired: false,
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
