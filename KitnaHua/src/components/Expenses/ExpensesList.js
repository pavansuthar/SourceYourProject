// core
import React from 'react';
// css
import "./ExpensesList.css";
// components
import ExpensesChart from "./ExpensesChart";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
    if (props.filteredExpenses.length === 0) {
        return (
            <h2 className='expenses-list__fallback'>
                Found no expenses
            </h2>
        );
    }

    return (
        <ul className='expenses-list'>
            <ExpensesChart filteredExpenses={props.filteredExpenses} />
            {props.filteredExpenses.map(item => (
                <ExpenseItem
                    key={item.id}
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                />
            ))}
        </ul>
    );
}

export default ExpensesList