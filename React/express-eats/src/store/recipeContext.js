// core
import React from "react";

const RecipeContext = React.createContext({
  recipes: [],
  totalAmount: 0,
  addItem: (recipe) => {},
  removeItem: (id) => {},
  clearItem: () => {},
});

export default RecipeContext;
