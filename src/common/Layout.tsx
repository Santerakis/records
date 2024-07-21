import { NavLink, Outlet } from "react-router-dom";
import { TablePage } from "../pages/TablePage/TablePage";
import { ChartPage } from "../pages/ChartPage/ChartPage";
import { useEffect, useState } from "react";
import { initMin } from "./utils/getMinDate";
import { initMax } from "./utils/getMaxDate";
import { useAppSelector } from "../app/store";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { appActions, appThunks } from "../app/appSlice";
import { getUniqueCountries } from "./utils/getUniqueCountries";
import { FilterByDate } from "./utils/FilterByDate";

export function Layout() {
  const rec = useAppSelector((state) => state.app.records);
  const dispatch = useAppDispatch();
  const [startConst, setStartConst] = useState<string>(() => initMin(rec));
  const [endConst, setEndConst] = useState<string>(() => initMax(rec));
  const [startDate, setStartDate] = useState<string>(() => initMin(rec));
  const [endDate, setEndDate] = useState<string>(() => initMax(rec));
  useEffect(() => {
    dispatch(appThunks.setRecords());
  }, [dispatch]);

  useEffect(() => {
    setStartConst(initMin(rec));
    setEndConst(initMax(rec));
    setStartDate(initMin(rec));
    setEndDate(initMax(rec));
    dispatch(appActions.setCountries({ countries: getUniqueCountries(rec) }));
  }, [rec]);

  const filteredByDate = FilterByDate(rec, startDate, endDate);

  return (
    <div className="container">
      <label>Начальная дата: </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        min={startConst}
        max={endConst}
      />
      <label>Конечная дата: </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={startConst}
        max={endConst}
      />

      <button>
        <NavLink to="table">Table</NavLink>
      </button>
      <button>
        <NavLink to="chart">Chart</NavLink>
      </button>

      {/*<TablePage data={filteredByDate} />*/}
      {/*<ChartPage data={filteredByDate} />*/}
      <Outlet context={{ filteredByDate }} />

      {/*<Routes>*/}
      {/*  <Route path="/" element={<Layout />}>*/}
      {/*    <Route index element={<TablePage />} />*/}
      {/*    <Route path="/about" element={<ChartPage />} />*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
    </div>
  );
}
