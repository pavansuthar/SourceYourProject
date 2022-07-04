// core
import React, { useState } from 'react';
// css
import "./Expenses.css";
// components
import Card from "./../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

const Expenses = (props) => {
    console.warn("Expenses rendered.");

    const [filteredYear, setFilteredYear] = useState("2022");

    const yearChangedHandler = selectedYear => {
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = props.items.filter(item => item.date.getFullYear().toString() === filteredYear);

    return (
        <Card className='expenses'>
            <ExpensesFilter selectedYear={filteredYear} onYearChange={yearChangedHandler} />
            <ExpensesList filteredExpenses={filteredExpenses} />
        </Card>
    )
}

export default Expenses;