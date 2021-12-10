// core
import React from "react";

const RecipeContext = React.createContext({
  recipes: [],
  totalAmount: 0,
  onAddRecipe: (item) => {},
  onDeleteRecipe: (id) => {},
  onUpdateRecipe: (item) => {},
  onClearRecipe: () => {},
});

export default RecipeContext;
