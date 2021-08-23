// css
import "./../../assets/scss/Product-item.scss";

const ProductItem = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card mb-2 mt-3">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={props?.items.image}
                className="img-fluid img-responsive rounded-start"
                alt="food"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h6 className="card-title text-primary">{props?.items.id} </h6>
                <p className="card-text">
                  {props?.items?.title?.length > 10
                    ? props?.items?.title?.substr(0, 20) + " ..."
                    : props?.items.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
