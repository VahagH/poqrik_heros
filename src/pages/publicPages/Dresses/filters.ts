import { COLORS } from "../../../support/types";

export const filters = [
  {
    name: "Փնտրել",
    key: "search",
  },
  {
    name: "Գին",
    key: "price",
    type: "radio",
    values: [
      { name: "0 - 4 000", value: [0, 4000] },
      { name: "4 000 - 6 000", value: [4000, 6000] },
      { name: "6 000 - 8 000", value: [6000, 8000] },
      { name: "8 000+", value: [8000] },
    ],
  },
  {
    name: "Տարիք",
    key: "age",
    type: "radio",
    values: [
      { name: "1", value: 1 },
      { name: "2", value: 2 },
      { name: "3", value: 3 },
      { name: "4", value: 4 },
      { name: "5", value: 5 },
      { name: "6", value: 6 },
      { name: "7", value: 7 },
      { name: "8", value: 8 },
      { name: "9", value: 9 },
      { name: "10+", value: 10 },
    ],
  },
  {
    name: "Գույն",
    key: "color",
    type: "checkbox",
    values: COLORS,
  },
];
