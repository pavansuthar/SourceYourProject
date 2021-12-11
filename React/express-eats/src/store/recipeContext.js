// core
import React from "react";

const RecipeContext = React.createContext({
  recipes: [],
  onAddRecipe: (item) => {},
  onClearRecipe: () => {},
});

export default RecipeContext;
