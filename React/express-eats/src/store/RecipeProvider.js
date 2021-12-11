// core
import { useReducer } from "react";
// context
import RecipeContext from "./recipeContext";

const defaultRecipeState = {
  items: [],
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const addRecipeInfo = {
        recipeKey: action.recipes.name,
        recipeId: action.recipes.id,
      };
      console.log(addRecipeInfo);
      return {
        items:
          state.items.length === 0
            ? [addRecipeInfo]
            : [state.items, addRecipeInfo],
      };
    case "CLEAR":
      return {
        items: null,
      };
    default:
  }
  return defaultRecipeState;
};

const RecipeProvider = (props) => {
  const [recipeState, dispatchRecipeAction] = useReducer(
    recipeReducer,
    defaultRecipeState
  );

  const onAddRecipeHandler = (recipes) => {
    dispatchRecipeAction({ type: "ADD", recipes: recipes });
  };

  const onClearRecipeHandler = () => {
    dispatchRecipeAction({ type: "CLEAR" });
  };

  const recipeContextValue = {
    recipes: recipeState?.items,
    onAddRecipe: onAddRecipeHandler,
    onClearRecipe: onClearRecipeHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
