// core
import React, { useState, useEffect } from "react";
// components
import Spinner from "../common/Spinner/Spinner";
import ProductDetails from "./ProductDetails/ProductDetails";
import Alerts from "./../common/Alerts/Alerts";
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
        <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
      )}
      {(products?.length === 0 || products === null) && !error && !isLoading && (
        <section className="col-md-6 card p-3">
          <Alerts
            alertType="alert-primary"
            icon={InfoCircle}
            msg={"No products are available in Expresseats."}
          />
        </section>
      )}
      {products && !error && !isLoading && (
        <ProductDetails recipes={products} />
      )}
    </ViewPage>
  );

  return <React.Fragment>{content}</React.Fragment>;
};

export default Product;
