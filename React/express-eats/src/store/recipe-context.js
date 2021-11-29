// core
import React, { useState, useEffect } from "react";
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
const RecipeContext = React.createContext(initialState);

export const RecipeContextProvider = (props) => {
  const [recipes, setRecipies] = useState([]);

  useEffect(() => {
    db.collection("recipes")
      .get()
      .then((snapshot) => {
        let getRecipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipies(getRecipes);
      });
  }, []);

  const onAddRecipes = (items) => {
    console.log(items);
    const recipeRef = firebase.firestore().collection("recipes");
    recipeRef
      .add({
        ...items,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((ref) => {
        console.log("Add doc with ID", ref, ref.id);
        const data = {
          items,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          id: ref.id,
        };
        setRecipies((prev) => {
          return [...prev, data];
        });
      });
  };

  const onUpdateRecipe = (items) => {
    console.log(items);
    const recipeRef = firebase.firestore().collection("recipes").doc(items.id);
    recipeRef
      .update(items)
      .then(() => console.log("doc is updated"))
      .catch((e) => console.error(e));
    // setRecipies((prev) => {
    //   return {
    //     ...prev,
    //     items,
    //   };
    // });
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

export default RecipeContext;
