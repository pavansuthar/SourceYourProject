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
    console.log(items);
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
        console.log("Add doc with ID", ref.id);
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
      .then(() => {
        console.log("docID is updated");
      })
      .catch((e) => console.error(e));
  };

  const onUpdateRecipe = (items) => {
    console.log(items, items.id);
    delete items.formError;
    delete items.isLoading;
    const recipeRef = firebase.firestore().collection("recipes").doc(items.id);
    recipeRef
      .update(items)
      .then(() => {
        console.log("doc is updated");
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
    // const recipeRef = firebase.firestore().collection("recipes").doc(id);
    // recipeRef
    //   .delete()
    //   .then(() => console.log("doc is deleted"))
    //   .catch((e) => console.error(e));
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
