// core
import React from "react";
// icons
import {
  BsFillInfoCircleFill,
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";

const Alerts = (props) => {
  let iconContent = null;
  switch (props.alertType) {
    case "alert-primary":
      iconContent = <BsFillInfoCircleFill />;
      break;
    case "alert-success":
      iconContent = <BsFillCheckCircleFill />;
      break;
    case "alert-danger":
      iconContent = <BsFillExclamationTriangleFill />;
      break;
    default:
      iconContent = <BsFillInfoCircleFill />;
  }
  return (
    <div className={`col-md-12 cards text-danger ${props.classes}`}>
      <div
        className={`alert ${props.alertType} alert-dismissible w-100`}
        role="alert"
      >
        {iconContent}
        <span style={{ marginLeft: 10, verticalAlign: "text-top" }}>
          {props.msg}
        </span>
        {props.onClose && (
          <button
            type="button"
            className="btn-close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={props.onClose}
          ></button>
        )}
      </div>
    </div>
  );
};

export default Alerts;
