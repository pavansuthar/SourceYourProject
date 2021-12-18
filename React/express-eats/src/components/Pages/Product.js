// core
import { useState, useEffect } from "react";
// components
import Spinner from "../Spinner/Spinner";
import ProductDetails from "./../ProductDetails/ProductDetails";
// css, icons
import "./Product.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";

const ProductWrapper = (props) => {
  return (
    <div className="row Products">
      <h2>Products</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">{props.children}</div>
      </div>
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHTTPError, setIsHTTPError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsURL =
        "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json";
      const response = await fetch(productsURL);
      const responseData = await response.json();
      const allProducts = [];
      for (const key in responseData) {
        allProducts.push({
          addedOn: responseData[key].addedOn,
          description: responseData[key].description,
          favourite: responseData[key].favourite,
          id: responseData[key].id,
          image: responseData[key].image,
          isActive: responseData[key].isActive,
          likes: responseData[key].likes,
          popular: responseData[key].popular,
          price: responseData[key].price,
          recipeName: responseData[key].recipeName,
          recipeNo: responseData[key].recipeNo,
          recipeKey: key,
          vegetarian: responseData[key].vegetarian,
        });
      }
      setProducts(allProducts);
      setIsLoading(false);
    };
    fetchProducts().catch((e) => {
      setIsHTTPError(e.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <Spinner color="text-dark" text="Loading all products" />
        </section>
      </ProductWrapper>
    );
  }

  if (isHTTPError) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <div className="alert alert-danger m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info" /> {isHTTPError}
          </div>
        </section>
      </ProductWrapper>
    );
  }

  if (products.length === 0 && !isHTTPError) {
    return (
      <ProductWrapper>
        <section className="col-md-6 card p-3">
          <div className="alert alert-primary m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info" /> No products are available.{" "}
          </div>
        </section>
      </ProductWrapper>
    );
  }

  return (
    <ProductWrapper>
      <div className="col-md-12">
        <p>Take a look at our products</p>
        <ProductDetails data={products} />
      </div>
    </ProductWrapper>
  );
};
export default Product;
