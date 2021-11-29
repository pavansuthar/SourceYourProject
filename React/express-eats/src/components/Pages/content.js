// scss
import React from "react";
import "./../../assets/scss/content.scss";
// components
// const Footer = React.lazy(() => import("../Footer/Footer"));

const Content = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row main">{props.children}</div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};
export default Content;
