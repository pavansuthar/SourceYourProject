// core
import React, { useState, useRef, useContext } from "react";
// components
import Spinner from "../common/Spinner/Spinner";
// context
import AuthContext from "./../../store/authProvider";
// css
import "./CartModal.scss";

const Backdrop = (props) => {
  return <div className="backdrop">{props.children}</div>;
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
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const authContext = useContext(AuthContext);
  const { userEmailId } = authContext;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    setLoading(true);
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

    setFormIsValid(
      enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredCitytIsValid &&
        enteredPortalIsValid
    );

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredPostal,
      postal: enteredCity,
      emailID: userEmailId,
    });
    setLoading(false);
    props.onClose();
  };

  return (
    <React.Fragment>
      <Backdrop>
        <div className="modal cartModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Fill your address</h5>
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
                    <input
                      type="text"
                      id="name"
                      ref={nameInputRef}
                      placeholder="Full name"
                    />
                    {!formInputValid.name && (
                      <p className="text-danger text-bold">
                        Please enter a valid name.
                      </p>
                    )}
                  </div>
                  <div className="control">
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      id="street"
                      ref={streetInputRef}
                      placeholder="Street name"
                    />
                    {!formInputValid.street && (
                      <p className="text-danger text-bold">
                        Please enter a valid street.
                      </p>
                    )}
                  </div>
                  <div className="control">
                    <label htmlFor="postal">Postal Code</label>
                    <input
                      type="text"
                      id="postal"
                      ref={postalInputRef}
                      placeholder="Only 5 digits"
                    />
                    {!formInputValid.postal && (
                      <p className="text-danger text-bold">
                        Please enter a valid postal.
                      </p>
                    )}
                  </div>
                  <div className="control">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      ref={cityInputRef}
                      placeholder="Like Bengaluru"
                    />
                    {!formInputValid.city && (
                      <p className="text-danger text-bold">
                        Please enter a valid city.
                      </p>
                    )}
                  </div>
                  <div className="mt-3 mb-3">
                    {loading && formIsValid && (
                      <Spinner
                        color="text-black"
                        align="h-100 mh-100 align-items-center"
                        text="Booking order"
                      />
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-success rounded-pill"
                      data-bs-dismiss="modal"
                    >
                      Place order
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
      </Backdrop>
    </React.Fragment>
  );
};

export default CartModal;
