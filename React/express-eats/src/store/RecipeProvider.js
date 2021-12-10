// core
import { useReducer } from "react";
// context
import RecipeContext from "./recipeContext";
// firebase
import firebase from "firebase";

const defaultRecipeState = {
  items: [],
  totalAmount: 0,
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log(state, action);
      delete action.recipes.formError;
      delete action.recipes.isLoading;
      const recipe = {
        ...action.recipes,
        addedOn: firebase.firestore.FieldValue.serverTimestamp(),
      };
      recipe.id = +recipe?.recipeNo.substr(5);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      };
      const postProduct = async () => {
        const productsURL =
          "https://react-virtusa-expresseats-default-rtdb.firebaseio.com/products.json";
        const response = await fetch(productsURL, options);
        const responseData = await response.json();
        console.log(responseData);
      };
      postProduct().catch((e) => {
        throw new Error(e.message);
      });
      return {
        items: [state?.items, recipe],
        totalAmount: 0,
      };
    case "UPDATE":
      break;
    case "DELETE":
      break;
    case "CLEAR":
      break;
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

  const onUpdateRecipeHandler = (recipe) => {
    dispatchRecipeAction({ type: "UPDATE", recipes: recipe });
  };

  const onDeleteRecipeHandler = (recipeID) => {
    dispatchRecipeAction({ type: "DELETE", id: recipeID });
  };

  const onClearRecipeHandler = () => {
    dispatchRecipeAction({ type: "CLEAR" });
  };

  const recipeContextValue = {
    recipes: recipeState?.items,
    totalAmount: recipeState?.totalAmount,
    onAddRecipe: onAddRecipeHandler,
    onDeleteRecipe: onDeleteRecipeHandler,
    onUpdateRecipe: onUpdateRecipeHandler,
    onClearRecipe: onClearRecipeHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
