// scss
import React from "react";
import "./../../assets/scss/content.scss";
// components
// const Footer = React.lazy(() => import("../Footer/Footer"));

const Content = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">{props.children}</div>
        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};
export default Content;
