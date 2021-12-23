// core
import React, { useState } from "react";
import ReactDOM from "react-dom";
// components
import Modal from "./../../common/Modal/Modal";
import { FaRupeeSign } from "react-icons/fa";

const ProductHistoryItems = (props) => {
  const orderRecipe = props?.getItems?.orderedRecipe;
  const userInfo = props?.getItems?.user;
  const [showAcc, setShowAcc] = useState(false);
  const [productsPopup, setProductsPopup] = useState([]);
  const [isProductModal, setIsProductModal] = useState(false);

  const getAllPrice = orderRecipe?.reduce((prev, curr) => {
    return prev + curr.amount * +curr.price;
  }, 0);

  const onShowAccordin = () => {
    setShowAcc((prev) => !prev);
  };

  const onShowProducts = (recipeNo, e) => {
    e.stopPropagation();
    const filterProduct = orderRecipe.filter((product) => {
      return product.recipeNo === recipeNo;
    });
    setProductsPopup(filterProduct);
    setIsProductModal(true);
  };

  const onCloseProducts = () => setIsProductModal(false);

  const showAccordinClass = showAcc
    ? "accordion-collapse collapse show"
    : "accordion-collapse collapse";

  return (
    <div className="historyItem">
      <div className="accordion-item" onClick={onShowAccordin}>
        <h2 className="accordion-header" id="headingOne">
          <button
            className={
              showAcc ? "accordion-button" : "accordion-button collapsed"
            }
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {userInfo.name} ({userInfo.emailID})
          </button>
        </h2>
        <div
          id="collapseOne"
          className={showAccordinClass}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-4">
                <h5 className="text-primary">Address</h5>
                <address>
                  <b>{userInfo?.name}</b>
                  <div>{userInfo?.emailID}</div>
                  <div>{userInfo?.street},</div>
                  <div>
                    {userInfo?.city}, {userInfo?.postal}.
                  </div>
                </address>
              </div>
              <div className="col-md-8">
                <h5 className="text-primary">Purchase</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Recipe No</th>
                      <th scope="col">Recipe Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderRecipe?.map((data) => {
                      return (
                        <tr key={data?.recipeNo}>
                          <td
                            className="pe-cursor"
                            onClick={(e) => onShowProducts(data?.recipeNo, e)}
                          >
                            {data?.recipeNo}
                          </td>
                          <td>
                            {data?.recipeName} (x {data?.amount})
                          </td>
                          <td>
                            <FaRupeeSign />
                            {Math.round(data?.price)}
                          </td>
                          <td>
                            <FaRupeeSign />
                            {Math.round(data?.price * data?.amount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="d-flex justify-content-center align-items-center">
                  <h5 className="text-primary mb-0">Total - </h5>
                  <FaRupeeSign />
                  {Math.round(getAllPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProductModal &&
        ReactDOM.createPortal(
          <Modal onClose={onCloseProducts} productData={productsPopup} />,
          document.getElementById("modal-popup")
        )}
    </div>
  );
};

export default ProductHistoryItems;
