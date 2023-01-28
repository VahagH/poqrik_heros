import { CaseInputTypes } from "../../../components/CaseInput/CaseInput";
import {
  currencyFormatterDecimal,
  timeZoneDateTime,
} from "../../../support/supportFunctions";
import {
  DIALOG_TYPES,
  ColumnProps,
  RESERV_STATUS_OPTION,
} from "../../../support/types";

function getStatus(status: string) {
  switch (status) {
    case "reserved":
      return "Ամրագրված";
    case "taken":
      return "Վերցված";
    case "received":
      return "Ստացված";
    case "cancelled":
      return "Չեղարկված";
    default:
      return "";
  }
}

function getColor(status: string) {
  switch (status) {
    case "reserved":
      return "#432fde";
    case "taken":
      return "#f2bb05";
    case "received":
      return "rgb(29, 195, 93)";
    case "cancelled":
      return "rgb(233, 100, 100)";
    default:
      return "#000";
  }
}

export const columns: ColumnProps[] = [
  {
    name: "Կոդ",
    key: "bookingN",
  },
  {
    name: "Անուն (Ազգանուն)",
    key: "fullName",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXT,
  },
  {
    name: "Հեռախոս",
    key: "phone",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TELEPHONE,
    customElement: (el: string, row: any) => (
      <div>
        <div>{el}</div>
        <div>{row?.phone2}</div>
      </div>
    ),
  },
  {
    name: "Հեռախոս 2",
    key: "phone2",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TELEPHONE,
    isRequired: false,
  },
  {
    name: "Տեսականի",
    key: "assortment",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    onChangeFunc: (formData, zis) => {
      const price = zis.reduce((pr: number, val: any) => {
        const price = +val.price;
        pr += val.sale ? Math.floor(price - price * (val.sale / 100)) : price;
        return pr;
      }, 0);
      return {
        price:
          formData.sale && formData.sale < price
            ? price - formData.sale
            : price,
      };
    },
    customElement: (el) => {
      return el?.length ? (
        <div style={{ fontWeight: 600 }}>
          {el.map(
            (item: any, idx: number) =>
              `${item.name}${idx !== el.length - 1 ? ", " : ""}`
          )}
        </div>
      ) : (
        "- - -"
      );
    },
    onlyRead: true,
    type: CaseInputTypes.MULTIPLE_AUTOCOMPLETE,
  },
  {
    name: "Կանխավճար",
    key: "deposit",
    mask: "99999",
    jsType: "number",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
    customElement: (el) => (
      <div style={{ whiteSpace: "pre" }}>{currencyFormatterDecimal(el)}</div>
    ),
  },
  {
    name: "Գին",
    key: "price",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    onlyRead: true,
    isRequired: false,
    type: CaseInputTypes.TEXT,
    customElement: (el) => (
      <div style={{ whiteSpace: "pre" }}> {currencyFormatterDecimal(el)}</div>
    ),
  },
  {
    shortName: "Զեղջ",
    name: "Զեղջ կանխիկ",
    key: "sale",
    hideInputFromDialog: (formData, handleChange, role) => role !== "admin",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.NUMBER,
    onChangeFunc: (formData, zis) => {
      if (formData?.price) {
        const price = formData.assortment.reduce((pr: number, val: any) => {
          const price = +val.price;
          pr += val.sale ? Math.floor(price - price * (val.sale / 100)) : price;
          return pr;
        }, 0);
        return { price: price > zis ? price - zis : price };
      }
      return null;
    },
    isRequired: false,
    mask: "99999",
    jsType: "number",
    customElement: (el) =>
      el ? (
        <div style={{ whiteSpace: "pre" }}>{currencyFormatterDecimal(el)}</div>
      ) : (
        "- - -"
      ),
  },
  {
    name: "Վերցնելու օր",
    key: "takeDay",
    hideColumnFromTable: true,
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.DATE_TIME,
  },
  {
    name: "Բերելու օր",
    key: "bringDay",
    hideColumnFromTable: true,
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.DATE_TIME,
  },

  {
    name: "Կարգավիճակ",
    key: "status",
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.AUTOCOMPLETE,
    options: RESERV_STATUS_OPTION,
    customElement: (el: string) => getStatus(el),
    customStyle: (el: string) => ({ color: getColor(el), fontWeight: 600 }),
  },
  {
    name: "Նշումներ",
    key: "notes",
    hideColumnFromTable: true,
    formTypes: [DIALOG_TYPES.add, DIALOG_TYPES.edit],
    type: CaseInputTypes.TEXTAREA,
    isRequired: false,
  },
  {
    name: "Ստեղծված",
    key: "createdAt",
    customElement: (el: number) => timeZoneDateTime(el),
  },
];

export const colapseColumns = [
  {
    name: "Կոդ",
    key: "name",
  },
  {
    name: "Տեսակ",
    key: "type",
    customElement: (el: string) => (el === "dress" ? "Տոնական" : "Կերպար"),
  },
  {
    name: "Գին",
    key: "price",
    customElement: (el: any) => currencyFormatterDecimal(el),
  },
  {
    name: "Զեղջ %",
    key: "sale",
    customElement: (el: any) => (el ? `${el} %` : "- - -"),
  },
];
