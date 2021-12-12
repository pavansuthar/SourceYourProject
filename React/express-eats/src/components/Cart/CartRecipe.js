// core
import React, { useContext } from "react";
// context
import RecipeContext from "../../store/recipeContext";

const CartRecipe = () => {
  const recipeCart = useContext(RecipeContext);
  console.log(recipeCart);

  return (
    <div>
      <p>Cart recipe</p>
    </div>
  );
};

export default CartRecipe;