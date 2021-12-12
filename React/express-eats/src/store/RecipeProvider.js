// core
import { useReducer } from "react";
// context
import RecipeContext from "./recipeContext";

const defaultRecipeCart = {
  items: [],
  totalAmount: 0,
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + +action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "CLEAR":
      return {
        items: null,
      };
    default:
  }
  return defaultRecipeCart;
};

const RecipeProvider = (props) => {
  const [recipeCartState, dispatchRecipeCartAction] = useReducer(
    recipeReducer,
    defaultRecipeCart
  );

  const onAddRecipeHandler = (recipes) => {
    dispatchRecipeCartAction({ type: "ADD", item: recipes });
  };

  const onRemoveRecipeHandler = (id) => {
    dispatchRecipeCartAction({ type: "REMOVE", id: id });
  };

  const onClearRecipeHandler = () => {
    dispatchRecipeCartAction({ type: "CLEAR" });
  };

  const recipeContextValue = {
    recipes: recipeCartState?.items,
    addItem: onAddRecipeHandler,
    removeItem: onRemoveRecipeHandler,
    clearItem: onClearRecipeHandler,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
