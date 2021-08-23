// scss
import "./../../assets/scss/content.scss";

const Content = (props) => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12">{props.children}</div>
      </div>
    </div>
  );
};
export default Content;
