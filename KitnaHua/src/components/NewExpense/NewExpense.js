// core
import React, { useState } from 'react';
// css
import "./NewExpense.css";
// components
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    console.warn("NewExpense rendered.");
    const [addExpense, setAddExpense] = useState(false);

    const onEditModeHandler = () => setAddExpense(!addExpense);

    const saveExpensesData = (enteredNewExpense) => {
        const expenseData = {
            ...enteredNewExpense,
            id: Math.random().toString(16),
        };
        props.onAddExpense(expenseData);
    };

    return (
        <div className='new-expense'>
            {!addExpense && <button onClick={onEditModeHandler}>Add New Expense</button>}
            {addExpense && <ExpenseForm onSaveExpenses={saveExpensesData} onToggleForm={onEditModeHandler} />}
        </div>
    )
}

export default NewExpense;