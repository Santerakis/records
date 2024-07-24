import { Column } from "./types";

export const columns: Array<Column> = [
  {
    key: "country",
    title: "Страна",
  },
  {
    key: "cases",
    title: "Случаев",
  },
  {
    key: "deaths",
    title: "Смертей",
  },
  {
    key: "allCases",
    title: "Случаев всего",
  },
  {
    key: "allDeaths",
    title: "Смертей всего",
  },
  {
    key: "casesPer1000",
    title: "Случаев на 1000",
  },
  {
    key: "deathsPer1000",
    title: "Смертей на 1000",
  },
];

// export const rangeParams = [
//   "",
//   "cases",
//   "deaths",
//   "allCases",
//   "allDeaths",
//   "casesPer1000",
//   "deathsPer1000",
// ];

export const rangeParams = [
  { value: "", title: "Сброс" },
  { value: "cases", title: "Случаев" },
  { value: "deaths", title: "Смертей" },
  { value: "allCases", title: "Случаев всего" },
  { value: "allDeaths", title: "Смертей всего" },
  { value: "casesPer1000", title: "Случаев на 1000 чел." },
  { value: "deathsPer1000", title: "Случаев на 1000 чел." },
];
