// core
import { useContext } from "react";
// css
import "./ProductItem.scss";
// icons
import { FaThumbsUp, FaSquare } from "react-icons/fa";
import { BsStarFill, BsHeartFill } from "react-icons/bs";
// components
import ProductItemForm from "../ProductItemForm/ProductItemForm";
// context
import RecipeContext from "../../../store/recipeContext";

const ProductItem = (props) => {
  const recipeCart = useContext(RecipeContext);

  const addToCartHandler = (amount) => {
    recipeCart.addItem({
      id: props?.items.id,
      recipeNo: props?.items.recipeNo,
      recipeName: props?.items.recipeName,
      recipeKey: props?.items.recipeKey,
      description: props?.items.description,
      price: props?.items.price,
      image: props?.items.image,
      isActive: props?.items.isActive,
      popular: props?.items.popular,
      favourite: props?.items.favourite,
      vegetarian: props?.items.vegetarian,
      likes: props?.items.likes,
      amount,
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 ProductItems">
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
                <h6 className="card-title text-primary">
                  {props?.items.recipeName}{" "}
                  <FaSquare fill={props?.items?.vegetarian ? "green" : "red"} />
                </h6>
                <p className="card-text">
                  {props?.items?.description?.length > 50
                    ? props?.items?.description?.substr(0, 60) + " ..."
                    : props?.items.description}
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
            <div className="pop">{props?.items.popular && <BsStarFill />}</div>
          </div>
          <div className="row">
            <ProductItemForm onAddToCart={addToCartHandler} amount={props?.items.price}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
