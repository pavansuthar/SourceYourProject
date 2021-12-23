// core
import React, { useState, useEffect, useContext } from "react";
// css
import "./ProductHistory.scss";
import InfoCircle from "./../../../assets/images/info-circle.svg";
// components
import ProductHistoryAcc from "./ProductHistoryAcc";
import ViewPage from "./../../../UI/ViewPage";
import useHttp from "../../../hooks/use-http";
import Spinner from "./../../common/Spinner/Spinner";
import Alerts from "./../../common/Alerts/Alerts";
// context
import AuthContext from "./../../../store/auth-context";

const ProductHistory = () => {
  const authCtx = useContext(AuthContext);
  const userEmailID = authCtx.userEmailId;
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendHttpRequet: fetchProducts } = useHttp();

  useEffect(() => {
    const getAllProducts = (allProducts) => {
      let filterByEmail = [];
      for (const key in allProducts) {
        filterByEmail.push(allProducts[key]);
      }
      setProducts(filterByEmail);
    };
    fetchProducts(
      {
        URL: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/orderHistory.json",
      },
      getAllProducts
    );
  }, [fetchProducts, userEmailID]);

  let contentHistory = (
    <React.Fragment>
      <section className="col-md-9 card p-3 historyProduct mt-3">
        <div className="row">
          <div className="col-md-12">
            <p className="h3 text-primary">Your purchase history</p>
            {isLoading && (
              <Spinner color="text-dark" text="Loading all products" />
            )}
            {error && (
              <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
            )}
            {(products?.length === 0 || products === null) &&
              !error &&
              !isLoading && (
                <Alerts
                  alertType="alert-primary"
                  icon={InfoCircle}
                  msg={"No history are available in Expresseats."}
                />
              )}
            {products && !error && !isLoading && (
              <ProductHistoryAcc products={products} />
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );

  return <ViewPage title="Product History">{contentHistory}</ViewPage>;
};

export default ProductHistory;
