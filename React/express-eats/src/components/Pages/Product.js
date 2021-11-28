// core
import { useContext } from "react";
// components
import ProductDetails from "./../ProductDetails/ProductDetails";
// context
import RecipeContext from "./../../store/recipe-context";
// css
import "./../../assets/scss/Product.scss";

const Product = () => {
  const recipeContext = useContext(RecipeContext);
  return (
    <div className="row Products">
      <h2>Products</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">
          <div className="col-md-12">
            <p>Take a look at our products</p>
            <ProductDetails data={recipeContext.recipes[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
