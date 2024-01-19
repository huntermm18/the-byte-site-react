import { createContext, useEffect, useState, useCallback } from "react";
import {getRecipes, addRecipe, removeRecipe, editRecipe, } from "../data/recipeData";

const RecipesContext = createContext({
  getRecipes: (refresh = false) => {},
  addRecipe: (recipeData) => {},
  removeRecipe: (recipeId) => {},
  editRecipe: (recipeId) => {},
});

export function RecipesContextProvider(props) {
  const [recipes, setRecipes] = useState([]);

  const getRecipesHandler = useCallback(
    async (refresh = false) => {
      // if we already have recipes, and we don't want to refresh, just return the recipes
      if (!refresh && recipes.length !== 0) {
        console.log("returning recipes");
        return recipes;
      }
      const retrievedRecipes = await getRecipes();
      setRecipes(retrievedRecipes);
      return retrievedRecipes;
    },
    [recipes]
  );

  // set recipes first time on load
  useEffect(() => {
    getRecipesHandler();
  }, [getRecipesHandler]);

  async function addRecipeHandler(recipeData, password) {
    const response = await addRecipe(recipeData, password);
    getRecipesHandler(true); // refresh recipes
    return response.status;
  }

  async function removeRecipeHandler(recipeId, password) {
    const response = await removeRecipe(recipeId, password);
    getRecipesHandler(true); // refresh recipes
    return response.status;
  }

  async function editRecipeHandler(recipeId, updatedRecipeData, password) {
    const response = await editRecipe(
      recipeId,
      updatedRecipeData,
      password
    );
    getRecipesHandler(true); // refresh recipes
    return response.status;
  }

  const context = {
    recipes: recipes,
    getRecipes: getRecipesHandler,
    addRecipe: addRecipeHandler,
    removeRecipe: removeRecipeHandler,
    editRecipe: editRecipeHandler,
  };

  return (
    <RecipesContext.Provider value={context}>
      {props.children}
    </RecipesContext.Provider>
  );
}

export default RecipesContext;
