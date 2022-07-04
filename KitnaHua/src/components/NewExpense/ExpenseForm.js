// core
import React, { useState } from 'react';
// css
import "./ExpenseForm.css";

const expenseInitialState = {
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: ""
};

const ExpenseForm = (props) => {
    console.warn("ExpenseForm rendered.");

    // const [enteredTitle, setenteredTitle] = useState("");
    // const [enteredAmount, setenteredAmount] = useState(0);
    // const [enteredDate, setenteredDate] = useState("");

    // or in single state 
    const [expenses, setExpenses] = useState(expenseInitialState);

    // Here "e" is SyntheticBaseEvent object
    // prevStateSnapshot is "latest state snapshot" react gives us
    const titleChangeHandler = e => {
        setExpenses((prevStateSnapshot) => {
            return {
                ...prevStateSnapshot,
                enteredTitle: e.target.value,
            }
        });
    };

    const amountChangeHandler = e => {
        setExpenses((prevStateSnapshot) => {
            return {
                ...prevStateSnapshot,
                enteredAmount: e.target.value,
            }
        });
    };

    const dateChangeHandler = e => {
        setExpenses((prevStateSnapshot) => {
            return {
                ...prevStateSnapshot,
                enteredDate: e.target.value,
            }
        });
    };

    const onExpenseFormSubmitHandler = (e) => {
        e.preventDefault();
        const expenseData = {
            title: expenses.enteredTitle,
            amount: +expenses.enteredAmount,
            date: new Date(expenses.enteredDate),
        };
        props.onSaveExpenses(expenseData);
        setExpenses(expenseInitialState);
    };

    return (
        <form onSubmit={onExpenseFormSubmitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type="text" onChange={titleChangeHandler} value={expenses.enteredTitle} />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler} value={expenses.enteredAmount} />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler} value={expenses.enteredDate} />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type="button" onClick={props.onToggleForm}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default ExpenseForm