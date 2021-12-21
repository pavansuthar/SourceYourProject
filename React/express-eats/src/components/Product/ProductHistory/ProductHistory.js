// core
import React, { useState, useEffect, useContext } from "react";
// css
import "./ProductHistory.scss";
import InfoCircle from "./../../../assets/images/info-circle.svg";
// components
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
        filterByEmail = [allProducts].filter(
          (products) => userEmailID === products[key]?.user?.emailID
        );
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
      <section className="col-md-9 card p-3 historyProduct">
        {isLoading && <Spinner color="text-dark" text="Loading all products" />}
        {error && (
          <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
        )}

        {products && !error && !isLoading && (
          <div className="row">
            <div className="col-md-12">
              <p className="h3 text-primary">Your purchase history</p>
              <div className="accordion" id="accordionExample">
                {products?.map((products) => {
                  const geyKey = Object.keys(products);
                  const getObject = products[geyKey];
                  console.log(getObject);
                  return (
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {getObject?.user?.name} ({getObject?.user?.emailID})
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {getObject?.orderedRecipe?.map((data) => {
                            return <div>{data?.amount}</div>;
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
      </section>
    </React.Fragment>
  );

  return <ViewPage title="Product History">{contentHistory}</ViewPage>;
};

export default ProductHistory;
