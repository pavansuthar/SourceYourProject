// core
import React from "react";
// css
import "./Chart.css";
// components
import ChartBar from "./ChartBar";

const Chart = (props) => {
    const dataPointsValue = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaxValue = Math.max(...dataPointsValue);

    return (
        <div className="chart">
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMaxValue}
                    label={dataPoint.label}
                />
            ))}
        </div>
    );
};

export default Chart;
