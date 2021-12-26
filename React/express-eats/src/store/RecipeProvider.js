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
      const existingCartItemIndex = state?.items?.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount =
        state.totalAmount +
        +action.item.price * (action?.isCart ? 1 : action.item.amount);
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
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
    case "REMOVE":
      const existingCartItemsIndex = state?.items?.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemsIndex];
      const updatedTotalAmt = state?.totalAmount - existingItem?.price;
      let updatedCartItems;
      if (existingItem?.amount === 1) {
        updatedCartItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem?.amount - 1,
        };
        updatedCartItems = [...state.items];
        updatedCartItems[existingCartItemsIndex] = updatedItem;
      }
      return {
        items: updatedCartItems,
        totalAmount: updatedTotalAmt,
      };
    case "CLEAR":
      return { items: [], totalAmount: 0 };
    default:
      return defaultRecipeCart;
  }
};

const RecipeProvider = (props) => {
  const [recipeCartState, dispatchRecipeCartAction] = useReducer(
    recipeReducer,
    defaultRecipeCart
  );

  const onAddRecipeHandler = (recipes, isCart) => {
    dispatchRecipeCartAction({ type: "ADD", item: recipes, isCart });
  };

  const onRemoveRecipeHandler = (id) => {
    dispatchRecipeCartAction({ type: "REMOVE", id });
  };

  const onClearRecipeHandler = () => {
    dispatchRecipeCartAction({ type: "CLEAR" });
  };

  const recipeContextValue = {
    recipes: recipeCartState?.items,
    totalAmount: recipeCartState?.totalAmount,
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
