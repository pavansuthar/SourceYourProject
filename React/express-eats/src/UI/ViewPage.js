// css
import "./ViewPage.scss";

const ViewPage = (props) => {
  return (
    <div className="row mainSection">
      <h2>{props.title}</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">{props.children}</div>
      </div>
    </div>
  );
};
export default ViewPage;
