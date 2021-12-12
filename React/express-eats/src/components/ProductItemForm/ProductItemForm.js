// core
import { useRef, useState } from "react";
// css
import "./ProductItemForm.scss";

const ProductItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    setAmountIsValid(true);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          min="1"
          max="5"
          step="1"
          defaultValue="1"
          ref={amountInputRef}
        />
      </div>
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default ProductItemForm;
