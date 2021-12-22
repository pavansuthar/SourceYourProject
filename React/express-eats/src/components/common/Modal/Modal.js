// core
import React from "react";
// css
import "./Modal.scss";
// icons
import { FaSquare, FaRupeeSign } from "react-icons/fa";

const Modal = (props) => {
  const products = props?.productData;
  return (
    <div
      className="modal"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{products[0].recipeNo}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={products[0].image}
                alt={products[0].recipeName}
                className="img-thumbnail"
              />
              <h6 className="mt-2">
                {products[0].recipeName}{" "}
                <FaSquare fill={products[0].vegetarian ? "green" : "red"} />
              </h6>
              <p>{products[0].description}</p>
              <p className="lead">
                Favourite - {products[0].favourite} | Likes -{" "}
                {products[0].likes} | {products[0].popular ? "Popular" : ""} |{" "}
                <FaRupeeSign fill={"gray"} /> {products[0].price}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
