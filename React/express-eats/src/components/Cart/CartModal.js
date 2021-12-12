// core
import React, { useState, useRef } from "react";
// css
import "./CartModal.scss";

const Backdrop = () => {
  return <div className="backdrop" />;
};

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CartModal = (props) => {
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCitytIsValid = !isEmpty(enteredCity);
    const enteredPortalIsValid = isFiveChars(enteredPostal);

    setFormInputValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCitytIsValid,
      postal: enteredPortalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCitytIsValid &&
      enteredPortalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredPostal,
      postal: enteredCity,
    });
    props.onClose();
  };

  return (
    <React.Fragment>
      <Backdrop />
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Fill form</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={confirmHandler}>
                <div className="control">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" ref={nameInputRef} />
                  {!formInputValid.name && <p>Please enter a valid name!</p>}
                </div>
                <div className="control">
                  <label htmlFor="street">Street</label>
                  <input type="text" id="street" ref={streetInputRef} />
                  {!formInputValid.street && (
                    <p>Please enter a valid street!</p>
                  )}
                </div>
                <div className="control">
                  <label htmlFor="postal">Postal Code</label>
                  <input type="text" id="postal" ref={postalInputRef} />
                  {!formInputValid.postal && (
                    <p>Please enter a valid postal!</p>
                  )}
                </div>
                <div className="control">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" ref={cityInputRef} />
                  {!formInputValid.city && <p>Please enter a valid city!</p>}
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Order
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    data-bs-dismiss="modal"
                    onClick={props.onClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartModal;
