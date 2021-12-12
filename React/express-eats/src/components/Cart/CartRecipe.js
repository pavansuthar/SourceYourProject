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
import Spinner from "./../Loading/Loading";
import CartModal from "./CartModal";

const CartRecipeWrapper = (props) => {
  return (
    <div className="row CartRecipe">
      <h2>View cart</h2>
      <hr />
      <div className="col-md-12">
        <div className="row sub-main">{props.children}</div>
      </div>
    </div>
  );
};

const modalElement = document.getElementById("popup");

const CartRecipe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckedout, setIsCheckedOut] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [products, setProducts] = useState([]);
  const recipeCart = useContext(RecipeContext);
  const { recipes, totalAmount } = recipeCart;
  const history = useHistory();

  useEffect(() => {
    setProducts(recipes);
    setIsLoading(false);
  }, [recipes]);

  const goToAddProduct = () => history.push("/Product");

  const onCartCheckout = () => setIsCheckedOut((prev) => !prev);

  const submitOrderHandler = async (userData) => {
    setIsLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedRecipe: products,
      }),
    };
    await fetch(
      "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/orderHistory.json",
      options
    );
    setIsLoading(false);
    setDidSubmit(true);
    recipeCart.clearItem();
  };

  if (isLoading) {
    return (
      <CartRecipeWrapper>
        <section className="col-md-6 card p-3">
          <Spinner color="text-dark" text="Loading all products" />
        </section>
      </CartRecipeWrapper>
    );
  }

  if (products?.length === 0 || !products) {
    return (
      <CartRecipeWrapper>
        <section className="col-md-6 card p-3">
          <div className="alert alert-primary m-3 p-3" role="alert">
            <img src={InfoCircle} alt="info" /> Your cart is empty.{" "}
            <p onClick={goToAddProduct}>Click here</p> to add new one ...
          </div>
        </section>
      </CartRecipeWrapper>
    );
  }

  return (
    <CartRecipeWrapper>
      {products && (
        <React.Fragment>
          <div className="col-md-7 card m-3">
            <div className="card p-3 m-3">
              <p className="h3 text-primary">Products in cart</p>
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
                          {value?.price} (x {value?.amount})
                        </td>
                        <td className="price">
                          <FaRupeeSign /> {value?.price * value?.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
          <div className="col-md-2 card m-3">
            <div className="card p-3 m-3">
              <p className="h3 text-primary">Order info</p>
              <p className="h5">
                Total - <FaRupeeSign /> {totalAmount}
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
    </CartRecipeWrapper>
  );
};

export default CartRecipe;
