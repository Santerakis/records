import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { CaseType } from "../../common/types";
import { chartFormatAndSum } from "../../common/utils/chartFormatAndSum";
import { createOptions } from "../../common/utils/createOptions";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../app/store";
import { useOutletContext } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export type ContextType = {
  filteredByDate: CaseType[];
};

export const ChartPage = () => {
  const [chartCountry, setChartCountry] = useState("sum");
  const countries = useAppSelector((state) => state.app.countries);
  const { filteredByDate } = useOutletContext<ContextType>();

  const chartDataForCountry = chartFormatAndSum(filteredByDate, chartCountry);
  const mappedOptionsforChart = createOptions(countries, [
    { value: "sum", title: "Все страны" },
  ]);

  const option = {
    // responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };
  const userData = {
    labels: chartDataForCountry.map((data) => data.dateRep),
    // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    datasets: [
      {
        label: "Cases",
        data: chartDataForCountry.map((data) => data.cases),
        // data: [0, 9, 5, 7, 8, 10, 9, 7, 5],
        borderColor: "black",
        borderWidth: 1,
        // tension: 1,
        pointBorderWidth: 0,
        pointRadius: 0,
        // tension: 0.4,
      },
      {
        label: "Deaths",
        data: chartDataForCountry.map((data) => data.deaths),
        // data: [0, 9, 5, 7, 8, 10, 9, 7, 5],
        borderColor: "red",
        borderWidth: 1,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };

  return (
    <>
        <div className={'fields'}>
      <select
        title="Выберите страну"
        style={{ width: "150px" }}
        onChange={(e) => {
          setChartCountry(e.currentTarget.value);
        }}
        value={chartCountry}
      >
        {mappedOptionsforChart}
      </select>
        </div>

      <div className={"graph-container"}>
        <div className="y-axis-label">Случаи</div>
        <div
          className={"graph"}
          style={{
            width: 650,
            background: "lightcyan",
            border: "solid, 1px, black",
            borderTop: "none",
            borderRight: "none",
            marginTop: "20px",
          }}
        >
          <Line data={userData} options={option} />
        </div>
        <div className="x-axis-label">Период</div>
      </div>
    </>
  );
};
