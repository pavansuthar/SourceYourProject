// core
import React from "react";
// components
import SVGIcons from "../SVG/SVGIcons";

const Alerts = (props) => {
  return (
    <div className="col-md-12 cards text-danger">
      <div
        className={`alert ${props.alertType} alert-dismissible w-100`}
        role="alert"
      >
        <SVGIcons />
        {props.msg}
        <button
          type="button"
          className="btn-close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
};

export default Alerts;
