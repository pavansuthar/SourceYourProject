// components
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductDetails from "./../ProductDetails/ProductDetails";

const Product = () => {
  const getRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "productItem" });
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-12">
        <h3>Products</h3>
        <p>Take a look at our products</p>
        <ProductDetails data={getRecipes} />
      </div>
    </div>
  );
};
export default Product;
