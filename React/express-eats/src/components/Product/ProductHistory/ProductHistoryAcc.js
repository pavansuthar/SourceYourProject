// core
import React from "react";
// css
import "./ProductHistoryAcc.scss";
// components
import ProductHistoryItems from "./ProductHistoryItems";

function ProductHistoryAcc(props) {
  const products = props?.products;
  return (
    <div className="accordion PHAccordin" id="accordionExample">
      {products?.map((products) => {
        return <ProductHistoryItems getItems={products} />;
      })}
    </div>
  );
}

export default ProductHistoryAcc;
