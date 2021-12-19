// core
import React from "react";
// animations
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeDownToast = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
  animationdelay: 10s;
`;

const Toast = (props) => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const currentDate = `${date}/${month}/${year}`;
  return (
    <FadeDownToast>
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto text-primary">Express Eats</strong>
          <small>{currentDate}</small>
          <button
            type="button"
            className="btn-close btn-close-dark me-2"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={props.onClose}
          ></button>
        </div>
        <div className="toast-body">{props.message}</div>
      </div>
    </FadeDownToast>
  );
};

export default Toast;
