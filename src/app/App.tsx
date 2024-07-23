import "./App.css";
import {TablePage} from "../pages/TablePage/TablePage";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../common/Layout";
import {ChartPage} from "../pages/ChartPage/ChartPage";

const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="table" replace/>}/>
                    <Route path="chart" element={<ChartPage/>}/>
                    <Route path="table" element={<TablePage/>}/>
                </Route>
            </Routes>
        </div>
    );
};
export default App;
