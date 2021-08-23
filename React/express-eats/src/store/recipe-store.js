// redux
import { createStore } from "redux";
// recipe json data
import recipesDataInfo from "./../data/recipesDetails.json";

const initialState = {
  recipes: [],
};

const RecipeStore = (state = initialState, action) => {
  if (action.type === "productItem") {
    const getRecipes = [...recipesDataInfo.recipesDetails];
    return {
      recipes: getRecipes,
    };
  }
  // returing unchanged state
  return state;
};
const store = createStore(RecipeStore);

export default store;
