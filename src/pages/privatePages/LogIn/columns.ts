import { CaseInputTypes } from "../../../components/CaseInput/CaseInput";
import { ColumnProps } from "../../../support/types";

export const columns: ColumnProps[] = [
  { key: "email", name: "Էլ․ Հասցե", type: CaseInputTypes.EMAIL },
  { key: "password", name: "Գաղտնաբառ", type: CaseInputTypes.PASSWORD },
];
