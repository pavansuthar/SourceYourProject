// core, hooks
import React from "react";
// components
import ProductItem from "./../ProductItem/ProductItem";
// import { Link } from "react-router-dom";
// animations
import styled, { keyframes } from "styled-components";
import { fadeInDownBig } from "react-animations";


const BouncyDiv = styled.div`
  animation: 2s ${keyframes`${fadeInDownBig}`};
`;

const ProductDetails = (props) => {
  const recipes = props.data;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          {recipes?.map((item) => (
            <div className="col-md-3 items" key={item.id}>
              <BouncyDiv>
                <ProductItem items={item} />
              </BouncyDiv>
              {/* <Link to={`/Product/${item.recipeID}`}>View info</Link> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
