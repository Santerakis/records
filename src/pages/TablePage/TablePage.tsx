import React, { useState } from "react";
import { CountryData, getTableItems } from "../../common/utils/getTableItems";
import { getMinMax } from "../../common/utils/getMinMax";
import { Table } from "../../components/Table/Table";
import { columns, rangeParams } from "../../app/data";
import Loader from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination";
import { createOptions } from "../../common/utils/createOptions";
import { useAppSelector } from "../../app/store";
import { sortByField } from "../../common/utils/sortByField";
import { CaseType, TableItem } from "../../common/types";
import { filterByRange } from "../../common/utils/filterByRange";
import { filterCountriesByCountry } from "../../common/utils/filterCountriesByCountry";
import { paginate } from "../../common/utils/paginate";
import { Sort } from "../../app/types";
import { useOutletContext } from "react-router-dom";
import { ContextType } from "../ChartPage/ChartPage";
import { Tooltip } from "../../components/Tooltip/Tooltip";

export const TablePage = () => {
  const countries = useAppSelector((state) => state.app.countries);
  const [selectValue, setSelectValue] = useState("allStates");
  const [rangeValue, setRangeValue] = useState<keyof CountryData | "">("");
  const [pageNumber, setPageNumber] = useState(1);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);
  const [sort, setSort] = useState<Sort>(null);
  const [pageSize, setPageSize] = useState(5);
  const { filteredByDate } = useOutletContext<ContextType>();

  const mappedOptions = createOptions(
    [
      { value: "allStates", title: "Все страны" },
      { value: "sumStates", title: "Сумма" },
    ],
    countries,
  );

  const mappedOptionsForRange = createOptions(rangeParams, []);

  const tableItems = getTableItems(filteredByDate);
  const sortedData = sortByField(
    tableItems,
    sort?.key as keyof TableItem,
    sort?.direction,
  );
  const filteredByRange = filterByRange(
    sortedData,
    rangeValue,
    minRange,
    maxRange,
  );
  const filteredByCountry = filterCountriesByCountry(
    filteredByRange,
    selectValue,
  );
  console.log(filteredByCountry);
  const tableData = paginate(filteredByCountry, pageNumber, pageSize);

  return (
    <div>
      <div className={"fields"}>
        <Tooltip text={"Выберите страну"}>
          <select
            style={{ width: "150px" }}
            onChange={(e) => {
              setSelectValue(e.currentTarget.value);
            }}
            value={selectValue}
          >
            {mappedOptions}
          </select>
        </Tooltip>

        <Tooltip text={"Фильтровть по колоне таблицы или сбрость фильтр"}>
          <select
            style={{ width: "130px" }}
            onChange={(e) => {
              setRangeValue(e.currentTarget.value as keyof CountryData);
              setPageNumber(1);
              // setMinMaxRange(
              //   getMinMax(tableItems, e.currentTarget.value as keyof CountryData),
              // );
              setMaxRange(
                getMinMax(
                  tableItems,
                  e.currentTarget.value as keyof CountryData,
                ).max,
              );
              setMinRange(
                getMinMax(
                  tableItems,
                  e.currentTarget.value as keyof CountryData,
                ).min,
              );
            }}
            value={rangeValue}
          >
            {mappedOptionsForRange}
          </select>
        </Tooltip>

        <Tooltip text={"Значение начала фильтрации"}>
          <input
            style={{ width: 90 }}
            type="number"
            value={rangeValue === "" ? "" : minRange}
            onChange={(e) => {
              setMinRange(+e.currentTarget.value);
              setPageNumber(1);
            }}
          />
        </Tooltip>

        <Tooltip text={"Значение окончания фильтрации"}>
          <input
            style={{ width: 90 }}
            type="number"
            value={rangeValue === "" ? "" : maxRange}
            onChange={(e) => {
              setMaxRange(+e.currentTarget.value);
              setPageNumber(1);
            }}
          />
        </Tooltip>
      </div>

      <Table
        columns={columns}
        sort={sort}
        onSort={setSort}
        tableData={tableData}
        range={rangeValue}
      />

      {tableData.length ? "" : <Loader />}

      <div className={"pagin-wrapper"}>
        <Pagination
          totalItems={filteredByCountry.length}
          currentPage={pageNumber}
          onPageChange={setPageNumber}
          itemsPerPage={pageSize}
          onItemsPerPageChange={setPageSize}
        />
      </div>
    </div>
  );
};
