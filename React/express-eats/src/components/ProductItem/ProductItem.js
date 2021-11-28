// css
import "./../../assets/scss/Product-item.scss";
// icons
import { BsTags } from "react-icons/bs";
import { BiLike, BiHeart } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { BsStarFill, BsHeartFill } from "react-icons/bs";

const ProductItem = (props) => {
  return (
    <div className="row">
      <div className="col-md-12 ProductItems">
        <div className="card mb-2 mt-3">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={props?.items.imgURL}
                className="img-fluid img-responsive rounded-start"
                alt="food"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h6 className="card-title text-primary">
                  {props?.items.name}{" "}
                </h6>
                <p className="card-text">
                  {props?.items?.description?.length > 50
                    ? props?.items?.description?.substr(0, 60) + " ..."
                    : props?.items.description}
                </p>
                <p className="card-text">
                  <BsTags /> Rs. {props?.items.price}
                </p>
              </div>
            </div>
          </div>
          <div className="row g-0 likeSection">
            <div className="likes">
              <FaThumbsUp /> {props?.items.likes}
            </div>
            <div className="fav">
              <BsHeartFill /> {props?.items.favourite}
            </div>
            <div className="pop">
              {props?.items.popular && <BsStarFill />}
            </div>
            <div className="Qtn">
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
