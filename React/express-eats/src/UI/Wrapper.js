// core
import { Fragment } from "react";
// css
import "./Wrapper.scss";

const Wrapper = (props) => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row main">{props.children}</div>
      </div>
    </Fragment>
  );
};
export default Wrapper;
