// core
import { useState, useEffect } from "react";
// css, icons
import "./ProductItemForm.scss";
import { BsTags } from "react-icons/bs";
import InfoCircle from "./../../../assets/images/info-circle.svg";
// components
import CSSTransition from "react-transition-group/CSSTransition";
import Alerts from "./../../common/Alerts/Alerts";

const ProductItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [QtyAmount, setQtyAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setQtyAmount(props.amount);
  }, [props.amount]);

  const inputHandler = (e) => {
    const getQtyAmt = e.target.value;
    setQtyAmount(+getQtyAmt);
    setAmountIsValid(true);
  };

  const addHandler = (event) => {
    event.preventDefault();

    if (QtyAmount === 0 || QtyAmount < 1 || QtyAmount > 5) {
      setAmountIsValid(false);
      setError("Please enter a valid Qty (1-5).");
      return;
    }
    props.onAddToCart(QtyAmount);
    setAmountIsValid(true);
  };

  return (
    <div className="col-md-12 addForm">
      <div className="row p-2">
        <div className="col-md-5">
          <p className="text-dark">
            <BsTags />
            {QtyAmount === 0
              ? " Rs. " + String(Math.round(props.price))
              : " Rs. " + Math.round(props.price) * QtyAmount}
          </p>
        </div>
        <div className="col-md-7">
          <form onSubmit={addHandler}>
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
              disabled={QtyAmount === 0}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <CSSTransition
        in={!amountIsValid}
        timeout={300}
        classNames="errorMsg"
        unmountOnExit
      >
        <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
      </CSSTransition>
      {/* {!amountIsValid && ( */}

      {/* )} */}
    </div>
  );
};

export default ProductItemForm;
