// core
import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
// context
import RecipeContext from "../../store/recipeContext";
// css, icons
import "./CartRecipe.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
import { FaRupeeSign } from "react-icons/fa";
// components
import Spinner from "../Spinner/Spinner";
import CartModal from "./CartModal";
import ViewPage from "./../../UI/ViewPage";
import Alerts from "./../common/Alerts/Alerts";
// hooks
import useHttp from "../../hooks/use-http";

const modalElement = document.getElementById("popup");

const CartRecipe = () => {
  const [isCheckedout, setIsCheckedOut] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [products, setProducts] = useState([]);
  const { isLoadings, error, sendHttpRequet: fetchCartProducts } = useHttp();

  const recipeCart = useContext(RecipeContext);
  const { recipes, totalAmount } = recipeCart;
  const history = useHistory();

  useEffect(() => {
    setProducts(recipes);
  }, [recipes]);

  const goToAddProduct = () => history.push("/Product");

  const onCartCheckout = () => setIsCheckedOut((prev) => !prev);

  const submitOrderHandler = async (userData) => {
    fetchCartProducts({
      url: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/orderHistory.json",
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedRecipe: products,
      }),
    });
    setDidSubmit(true);
    recipeCart.clearItem();
  };

  if (isLoadings) {
    return (
      <ViewPage title="View cart">
        <section className="col-md-6 card p-3">
          <Spinner color="text-dark" text="Loading all products" />
        </section>
      </ViewPage>
    );
  }

  if (error) {
    return (
      <ViewPage title="View cart">
        <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
      </ViewPage>
    );
  }

  if ((products?.length === 0 || !products) && !didSubmit) {
    return (
      <ViewPage title="View cart">
        <section className="col-md-6 card p-3">
          <div className="alert alert-primary m-3 p-3" role="alert">
            <img src={InfoCircle} alt="info" /> Your cart is empty.{" "}
            <p className="text-primary" onClick={goToAddProduct}>
              Click here
            </p>{" "}
            to add new one ...
          </div>
        </section>
      </ViewPage>
    );
  }

  return (
    <ViewPage title="View cart">
      {products && (
        <React.Fragment>
          <div className="col-md-7 card m-3">
            <div className="p-2 m-2">
              <p className="h3 text-primary">Items in cart</p>
              <section>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price (Quantity)</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((value) => (
                      <tr key={value?.recipeKey}>
                        <th scope="row">{value?.recipeNo}</th>
                        <td>{value?.recipeName}</td>
                        <td>
                          {Math.round(value?.price)} (x {value?.amount})
                        </td>
                        <td className="price">
                          <FaRupeeSign />{" "}
                          {Math.round(value?.price * value?.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
          <div className="col-md-2 card m-3">
            <div className="p-2 m-2">
              <p className="h3 text-primary">Items info</p>
              <p className="h5 text-dark">
                Total - <FaRupeeSign /> {Math.round(totalAmount)}
              </p>
              <div className="d-grid gap-2">
                <div className="btn-group-vertical">
                  {" "}
                  <button
                    className="btn btn-success m-2 rounded-pill"
                    type="button"
                    onClick={onCartCheckout}
                    disabled={isCheckedout}
                  >
                    Checkout
                  </button>
                  <button
                    className="btn btn-secondary m-2 rounded-pill"
                    type="button"
                    disabled={isCheckedout}
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      {isCheckedout &&
        ReactDOM.createPortal(
          <CartModal onClose={onCartCheckout} onConfirm={submitOrderHandler} />,
          modalElement
        )}
    </ViewPage>
  );
};

export default CartRecipe;
