// core
import React, { useState } from "react";
// firebase
import firebase from "firebase";
import { db } from "./../firebase/firebase";

const initialState = {
  recipes: [],
  totalAmount: 0,
  onAddRecipe: (item) => {},
  onDeleteRecipe: (id) => {},
  onUpdateRecipe: (item) => {},
};

db.collection("recipes")
  .get()
  .then((snapshot) => {
    let getRecipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    initialState.recipes.push(getRecipes);
  });

const RecipeContext = React.createContext(initialState);

export const RecipeContextProvider = (props) => {
  const [recipes, setRecipies] = useState(initialState.recipes);

  const onAddRecipes = (items) => {
    delete items.formError;
    delete items.isLoading;
    const recipe = {
      ...items,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const recipeFB = firebase.firestore().collection("recipes");
    recipeFB
      .add(recipe)
      .then((ref) => {
        let getRefId = ref.id;
        recipe.id = getRefId;
        onUpdateRecipeId(getRefId);
        let addRecipe;
        if (recipes.length === 0) {
          addRecipe = [recipe];
        } else {
          addRecipe = [...recipes, recipe];
        }
        setRecipies(addRecipe);
      })
      .catch((e) => console.error(e));
  };

  const onUpdateRecipeId = (id) => {
    const recipeRef = firebase.firestore().collection("recipes").doc(id);
    recipeRef
      .update({
        id,
      })
      .then(() => {})
      .catch((e) => console.error(e));
  };

  const onUpdateRecipe = (items) => {
    delete items.formError;
    delete items.isLoading;
    const recipeRef = firebase.firestore().collection("recipes").doc(items.id);
    recipeRef
      .update(items)
      .then(() => {
        setRecipies((prevRecipe) => {
          let allRecipes = recipes[0];
          let filterIndex = recipes[0].findIndex(
            (recipe) => recipe.id === items.id
          );
          allRecipes[filterIndex] = items;
          return allRecipes;
        });
      })
      .catch((e) => console.error(e));
  };

  const onDeleteRecipe = (id) => {
    console.log(id);
  };

  const recipeContextValue = {
    recipes: recipes,
    totalAmount: 0,
    onAddRecipes: onAddRecipes,
    onDeleteRecipe: onDeleteRecipe,
    onUpdateRecipe: onUpdateRecipe,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {props.children}
    </RecipeContext.Provider>
  );
};

RecipeContextProvider.displayName = "recipeContext";
export default RecipeContext;
