// core
import { useState } from "react";
// css, icons
import "./ProductItemForm.scss";
import { BsTags } from "react-icons/bs";

const ProductItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [QtyAmount, setQtyAmount] = useState(0);

  const inputHandler = (e) => {
    const getQtyAmt = e.target.value;
    setQtyAmount(+getQtyAmt);
    setAmountIsValid(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (QtyAmount === 0 || QtyAmount < 1 || QtyAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(QtyAmount);
    setAmountIsValid(true);
  };

  return (
    <div className="col-md-12 addForm">
      <div className="row p-2">
        <div className="col-md-6">
          <p className="text-dark">
            <BsTags />
            {QtyAmount === 0
              ? " Rs." + Math.round(props.amount)
              : " Rs." + Math.round(props.amount) * QtyAmount}
          </p>
        </div>
        <div className="col-md-6">
          <form onSubmit={submitHandler}>
            <label
              htmlFor="amount"
              className="col-form-label col-form-label-sm"
            >
              Qty
            </label>
            <div className="col-md-5">
              <input
                type="number"
                step="1"
                className="form-control form-control-sm"
                id="floatingInput"
                placeholder="0"
                value={QtyAmount}
                onChange={inputHandler}
              />
            </div>
            <button
              className="btn btn-success btn-sm rounded-pill"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      {!amountIsValid && (
        <div className="row">
          <div className="col-md-12 m-1">
            <p className="text-danger">Please enter a valid Qty (1-5).</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItemForm;
