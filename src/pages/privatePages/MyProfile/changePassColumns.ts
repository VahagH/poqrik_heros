import { CaseInputTypes } from "../../../components/CaseInput/CaseInput";
import { ColumnProps } from "../../../support/types";

export const columns: ColumnProps[] = [
  {
    name: "Գաղտնաբառ",
    key: "password",
    type: CaseInputTypes.PASSWORD,
    mdGrid: 12,
    minStringLength: 6,
  },
  {
    name: "Հաստատել գաղտնաբառը",
    key: "confirmPassword",
    type: CaseInputTypes.PASSWORD,
    confirming: true,
    mdGrid: 12,
    minStringLength: 6,
  },
];
