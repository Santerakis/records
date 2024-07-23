import {NavLink, Outlet} from "react-router-dom";
import {TablePage} from "../pages/TablePage/TablePage";
import {ChartPage} from "../pages/ChartPage/ChartPage";
import {useEffect, useState} from "react";
import {initMin} from "./utils/getMinDate";
import {initMax} from "./utils/getMaxDate";
import {useAppSelector} from "../app/store";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appActions, appThunks} from "../app/appSlice";
import {getUniqueCountries} from "./utils/getUniqueCountries";
import {FilterByDate} from "./utils/fiterByDate";

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
        dispatch(appActions.setCountries({countries: getUniqueCountries(rec)}));
    }, [rec]);

    const filteredByDate = FilterByDate(rec, startDate, endDate);

    return (
        <div className="container">
            <div className={'period-container'}>
                <label>Период от </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={startConst}
                    max={endConst}
                    className={'period'}
                />
                <label>до </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startConst}
                    max={endConst}
                />
            </div>
            <div className={'buttons'}>
                <NavLink className={({isActive}) => `button ${isActive ? 'button-active' : ''}`}
                         to="table">Таблица</NavLink>
                <NavLink className={({isActive}) => `button ${isActive ? 'button-active' : ''}`}
                         to="chart">График</NavLink>
            </div>
            <div className={'content'}>
                <Outlet context={{filteredByDate}}/>
            </div>
        </div>
    );
}
