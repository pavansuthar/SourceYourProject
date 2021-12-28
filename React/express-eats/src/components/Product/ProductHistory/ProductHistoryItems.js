// core
import React, { useState } from "react";
import ReactDOM from "react-dom";
// components
import Modal from "./../../common/Modal/Modal";
import { FaRupeeSign, FaCloudDownloadAlt } from "react-icons/fa";
import Spinner from "./../../common/Spinner/Spinner";
// pdf
import { jsPDF } from "jspdf";

const ProductHistoryItems = (props) => {
  const orderRecipe = props?.getItems?.orderedRecipe;
  const userInfo = props?.getItems?.user;
  const [showAcc, setShowAcc] = useState(false);
  const [productsPopup, setProductsPopup] = useState([]);
  const [isProductModal, setIsProductModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllPrice = orderRecipe?.reduce((prev, curr) => {
    return prev + curr.amount * +curr.price;
  }, 0);

  const onShowAccordin = () => {
    setShowAcc((prev) => !prev);
  };

  const onDownloadReport = (e) => {
    e.stopPropagation();
    setLoading(true);

    const generateData = function () {
      const result = [];
      for (var i = 0; i < orderRecipe.length; i++) {
        const data = {
          RecipeNo: orderRecipe[i].recipeNo,
          RecipeName: orderRecipe[i].recipeName,
          Price: Math.round(orderRecipe[i].price).toString(),
          Qty: orderRecipe[i].amount.toString(),
        };
        data.ID = (i + 1).toString();
        result.push(Object.assign({}, data));
      }
      return result;
    };
    generateData();

    function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i++) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 50,
          align: "center",
          padding: 0,
        });
      }
      return result;
    }

    var headers = createHeaders([
      "ID",
      "RecipeNo",
      "RecipeName",
      "Price",
      "Qty",
    ]);

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });
    doc.setFontSize(22);
    doc.setTextColor("#673ab7");
    doc.text("Express eats", 10, 20);
    doc.setTextColor("#262626");
    doc.setFontSize(15);
    doc.text(`Purchase Receipt as on ${props?.getItems?.purchasedOn}`, 10, 30);
    doc.setTextColor("#673ab7");
    doc.text(`Delivered to`, 10, 40);
    doc.setTextColor("#262626");
    doc.text(
      `${userInfo?.name}, ${userInfo?.street}, ${userInfo?.city}, ${userInfo?.postal}`,
      10,
      50
    );

    doc.table(10, 60, generateData(), headers, {
      autoSize: false,
      headerBackgroundColor: "#673ab7",
      headerTextColor: "#ffffff",
      printHeaders: true,
    });

    doc.save("Recipt.pdf");
    setLoading(false);
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
            {userInfo.name} ({userInfo.emailID}) |{" "}
            {props?.getItems?.purchasedOn}
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
                <div className="d-flex justify-content-around align-items-center">
                  <h5 className="text-primary mb-0">
                    Total - <FaRupeeSign />
                    {Math.round(getAllPrice)}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => onDownloadReport(e)}
                  >
                    <FaCloudDownloadAlt /> Receipt
                  </button>
                  {loading && (
                    <Spinner
                      color="text-primary"
                      align="h-100 mh-100 align-items-center"
                    />
                  )}
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
