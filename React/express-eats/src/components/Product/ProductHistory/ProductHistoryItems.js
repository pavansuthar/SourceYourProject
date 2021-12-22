// core
import React from "react";
// components
import { FaRupeeSign } from "react-icons/fa";

const ProductHistoryItems = (props) => {
  const orderRecipe = props?.getItems?.orderedRecipe;
  const userInfo = props?.getItems?.user;

  const getAllPrice = orderRecipe?.reduce((prev, curr) => {
    return prev + +curr.price;
  }, 0);

  return (
    <div className="historyItem">
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
            {userInfo.name} ({userInfo.emailID})
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <h5 className="text-primary">Purchase</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Recipe Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderRecipe?.map((data) => {
                      return (
                        <tr key={data?.recipeNo}>
                          <td>{data?.recipeName}</td>
                          <td>{data?.amount}</td>
                          <td>
                            <FaRupeeSign />
                            {Math.round(data?.price)}
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
    </div>
  );
};

export default ProductHistoryItems;
