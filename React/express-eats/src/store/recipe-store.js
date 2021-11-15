// redux
import { createStore } from "redux";
// recipe json data
import recipesDataInfo from "./../data/recipesDetails.json";
// firebase
import firebase from "firebase";
import { db } from "./../firebase/firebase";

const initialState = {
  recipes: [],
  totalAmount: 0,
  onAddRecipe: (item) => {},
  onRemoveRecipe: (id) => {},
};

db.collection("recipes")
  .get()
  .then((snapshot) => {
    let getRecipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    initialState.recipes = getRecipes;
  });

const RecipeStore = (state = initialState, action) => {
  if (action.type === "productItem") {
    const getRecipes = [...recipesDataInfo.recipesDetails];
    return {
      recipes: getRecipes,
    };
  }

  if (action.type === "add") {
    let getFormData = {
      ...action.payload,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("recipes").add(getFormData);
  }

  if (action.type === "remove") {
  }

  return state;
};

const store = createStore(RecipeStore);

export default store;
