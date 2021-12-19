// core
import React, { useState, useEffect } from "react";
// components
import Spinner from "../Spinner/Spinner";
import ProductDetails from "./ProductDetails/ProductDetails";
// css, icons
import "./Product.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
// hooks
import useHttp from "../../hooks/use-http";
import ViewPage from "../../UI/ViewPage";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendHttpRequet: fetchProducts } = useHttp();

  useEffect(() => {
    const getAllProducts = (products) => {
      setProducts(products);
    };
    fetchProducts(
      {
        URL: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json",
      },
      getAllProducts
    );
  }, [fetchProducts]);

  let content = (
    <ViewPage title="Products">
      {isLoading && (
        <section className="col-md-6 card p-3">
          <Spinner color="text-dark" text="Loading all products" />
        </section>
      )}
      {error && (
        <section className="col-md-6 card p-3">
          <div className="alert alert-danger m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info" /> {error}
          </div>
        </section>
      )}
      {products.length === 0 && !error && !isLoading && (
        <section className="col-md-6 card p-3">
          <div className="alert alert-primary m-3 p-3 w-100" role="alert">
            <img src={InfoCircle} alt="info" /> No products are available.
          </div>
        </section>
      )}
      {products && !error && !isLoading && (
        <div className="col-md-12">
          <p>Take a look at our products</p>
          <ProductDetails recipes={products} />
        </div>
      )}
    </ViewPage>
  );

  return <React.Fragment>{content}</React.Fragment>;
};
export default Product;
