// core, hooks
import React, { useEffect, useState } from "react";
// components
import ProductItem from "../ProductItem/ProductItem";
// animations
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const BouncyDiv = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const ProductDetails = (props) => {
  const [recipes, setRecipes] = useState([]);
  const products = props.recipes;

  useEffect(() => {
    const getAllProducts = () => {
      const allProducts = [];
      for (const key in products) {
        allProducts.push({
          addedOn: products[key].addedOn,
          description: products[key].description,
          favourite: products[key].favourite,
          id: products[key].id,
          image: products[key].image,
          isActive: products[key].isActive,
          likes: products[key].likes,
          popular: products[key].popular,
          price: products[key].price,
          recipeName: products[key].recipeName,
          recipeNo: products[key].recipeNo,
          recipeKey: key,
          vegetarian: products[key].vegetarian,
        });
      }
      setRecipes(allProducts);
    };
    getAllProducts();
  }, [products]);

  return (
    <div className="col-md-12">
      <div className="row">
        {recipes
          ?.filter((products) => products.isActive === true)
          .map((item) => (
            <div className="col-md-3 items" key={item.id}>
              <BouncyDiv>
                <ProductItem items={item} />
              </BouncyDiv>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
