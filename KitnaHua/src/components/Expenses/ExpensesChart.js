// core
import React from 'react';
// components
import Chart from "./../Chart/Chart";

const ExpensesChart = (props) => {
    const chartDataPoints = [
        { label: "JAN", value: 0 },
        { label: "FEB", value: 0 },
        { label: "MAR", value: 0 },
        { label: "APR", value: 0 },
        { label: "MAY", value: 0 },
        { label: "JUNE", value: 0 },
        { label: "JULY", value: 0 },
        { label: "AUG", value: 0 },
        { label: "SEP", value: 0 },
        { label: "OCT", value: 0 },
        { label: "NOV", value: 0 },
        { label: "DEC", value: 0 },
    ];

    for (const expenses of props.filteredExpenses) {
        const expenseMonth = expenses.date.getMonth();
        chartDataPoints[expenseMonth].value += expenses.amount;
    }

    return (
        <Chart dataPoints={chartDataPoints} />
    )
}

export default ExpensesChart;