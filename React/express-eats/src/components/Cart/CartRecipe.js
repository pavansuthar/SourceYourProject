// core
import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
// context
import RecipeContext from "../../store/recipeContext";
// css, icons
import "./CartRecipe.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
import { FaRupeeSign, FaMinusCircle } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
// components
import Spinner from "../common/Spinner/Spinner";
import CartModal from "./CartModal";
import ViewPage from "./../../UI/ViewPage";
import Alerts from "./../common/Alerts/Alerts";
import Modal from "../common/Modal/Modal";
import Toast from "./../common/Toast/Toast";
// hooks
import useHttp from "../../hooks/use-http";

const CartRecipe = () => {
  const [isCheckedout, setIsCheckedOut] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsPopup, setProductsPopup] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { isLoadings, error, sendHttpRequet: fetchCartProducts } = useHttp();

  const recipeCart = useContext(RecipeContext);
  const { recipes, totalAmount } = recipeCart;
  const history = useHistory();

  useEffect(() => {
    setProducts(recipes);
  }, [recipes]);

  const goToAddProduct = () => history.push("/Product");

  const goToHistory = () => history.push("/ProductHistory");

  const onCartCheckout = () => setIsCheckedOut((prev) => !prev);

  const ongetResponse = (data) => console.log(data);

  const submitOrderHandler = async (userData) => {
    const dateTime = new Date().getTime();
    fetchCartProducts(
      {
        URL: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/orderHistory.json",
        method: "POST",
        body: {
          user: userData,
          orderedRecipe: products,
          purchasedOn: new Date(dateTime).toLocaleString(),
        },
      },
      ongetResponse
    );
    setDidSubmit(true);
    onClearCart();
  };

  const onClearCart = () => {
    recipeCart.clearItem();
  };

  const addCartHandler = (items) => {
    recipeCart.addItem(items, true);
    setShowToast(true);
    setToastMsg(`Added ${items?.recipeName} to the cart`);
    localStorage.setItem("showCartToast", true);
    setTimeout(() => onHideToast(), 3000);
  };

  const removeCartHandler = (id, name) => {
    recipeCart.removeItem(id);
    setShowToast(true);
    setToastMsg(`Removed ${name} from the cart`);
    localStorage.setItem("showCartToast", true);
    setTimeout(() => onHideToast(), 3000);
  };

  const onHideToast = () => {
    setShowToast(false);
    localStorage.setItem("showCartToast", false);
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

  const NoProductContent = (
    <React.Fragment>
      Your cart is empty.{" "}
      <p className="text-primary" onClick={goToAddProduct}>
        Click here
      </p>{" "}
      to add new one.
    </React.Fragment>
  );

  const SuccessContent = (
    <React.Fragment>
      Successfully booked your orders in Expresseats.
      <p className="text-primary" onClick={goToHistory}>
        {" "}
        Click here
      </p>{" "}
      to see your purchase history.
    </React.Fragment>
  );

  const onShowProducts = (recipeNo) => {
    const filterProduct = products.filter((product) => {
      return product.recipeNo === recipeNo;
    });
    setProductsPopup(filterProduct);
    setIsProductModal(true);
  };

  const onCloseProducts = () => {
    setIsProductModal(false);
  };

  return (
    <ViewPage title="View cart">
      <React.Fragment>
        <div className="col-md-7 card m-3 cartRecipe">
          <div className="p-2 m-2">
            <p className="h3">Items in cart</p>
            {didSubmit && (
              <Alerts
                alertType="alert-success"
                icon={InfoCircle}
                msg={SuccessContent}
              />
            )}
            {error && (
              <Alerts alertType="alert-danger" icon={InfoCircle} msg={error} />
            )}
            {(products?.length === 0 || !products) && !didSubmit && (
              <div className="row">
                <section className="col-md-12">
                  <Alerts
                    alertType="alert-primary mt-3"
                    icon={InfoCircle}
                    msg={NoProductContent}
                  />
                </section>
              </div>
            )}
            {products.length !== 0 && (
              <section>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((value) => (
                      <tr key={value?.recipeKey}>
                        <th
                          scope="row"
                          onClick={onShowProducts.bind(null, value?.recipeNo)}
                          className="pe-cursor"
                        >
                          {value?.recipeNo}
                        </th>
                        <td>{value?.recipeName}</td>
                        <td>{Math.round(value?.price)}</td>
                        <td className="price">
                          <FaRupeeSign />{" "}
                          {Math.round(value?.price * value?.amount)}
                        </td>
                        <td className="iconsBtn">
                          <BsFillPlusCircleFill
                            fill="#0d6efd"
                            onClick={() => addCartHandler(value)}
                          />
                          <p>{value?.amount}</p>
                          <FaMinusCircle
                            fill="#f71212"
                            onClick={() =>
                              removeCartHandler(value?.id, value?.recipeName)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </div>
        <div className="col-md-2 card m-3 cartRecipe">
          <div className="p-2 m-2">
            <p className="h3">Items info</p>
            <p className="h5 text-dark">
              Total - <FaRupeeSign /> {Math.round(+totalAmount)}
            </p>
            <div className="d-grid gap-2">
              <div className="btn-group-vertical">
                {" "}
                <button
                  className="btn btn-success m-2 rounded-pill"
                  type="button"
                  onClick={onCartCheckout}
                  disabled={isCheckedout || totalAmount === 0}
                >
                  Checkout
                </button>
                <button
                  className="btn btn-secondary m-2 rounded-pill"
                  type="button"
                  disabled={isCheckedout || totalAmount === 0}
                  onClick={onClearCart}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
      {isCheckedout &&
        ReactDOM.createPortal(
          <CartModal onClose={onCartCheckout} onConfirm={submitOrderHandler} />,
          document.getElementById("popup")
        )}
      {isProductModal &&
        ReactDOM.createPortal(
          <Modal onClose={onCloseProducts} productData={productsPopup} />,
          document.getElementById("modal-popup")
        )}
      {showToast &&
        ReactDOM.createPortal(
          <Toast message={toastMsg} onClose={onHideToast} />,
          document.getElementById("toast")
        )}
    </ViewPage>
  );
};

export default CartRecipe;
