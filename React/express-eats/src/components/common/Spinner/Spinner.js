// scss
import "./Spinner.scss";

const Spinner = (props) => {
  let color = props.color || "text-dark";
  let align = props.align || "h-100 mh-100";
  let text = props.text || "Loading";

  return (
    <div className={`d-flex justify-content-center loader ${align}`}>
      <div className={color}>
        <strong>{text}</strong>
      </div>
      <div className={`spinner-border ${color} ms-2`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
