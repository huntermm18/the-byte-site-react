import { createContext, useEffect, useState, useCallback } from "react";

// set base to be local server if running locally, otherwise use production server
const ENV = "dev";
const base =
  ENV === "dev"
    ? "http://localhost:3001"
    : "https://us-west-2.aws.data.mongodb-api.com";

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

      console.log("getting recipes");
      const url = `${base}/app/data-wasdn/endpoint/data/v1/action/find`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          email: "huntermm17@gmail.com",
          password: "bytesite",
        },

        body: JSON.stringify({
          dataSource: "byte-site-cluster",
          database: "recipes",
          collection: "recipe-collection",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      // console.log(result.documents);
      setRecipes(result.documents);
      return result.documents;
    },
    [recipes]
  );

  // set recipes first time on load
  useEffect(() => {
    getRecipesHandler();
  }, [getRecipesHandler]);

  async function addRecipeHandler(recipeData, password) {
    const url = `${base}/app/data-wasdn/endpoint/data/v1/action/insertOne`;
    console.log("adding recipe: ", recipeData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/ejson",
        Accept: "application/json",
        email: "huntermm18@gmail.com",
        password: password,
      },
      body: JSON.stringify({
        dataSource: "byte-site-cluster",
        database: "recipes",
        collection: "recipe-collection",
        document: recipeData,
      }),
    });

    console.log(
      response.ok
        ? "success adding recipe"
        : `failed to add recipe - ${response}`
    );

    getRecipesHandler(true); // refresh recipes
    return response.status;
  }

  function removeRecipeHandler(meetupId) {
    // todo
  }

  function editRecipeHandler(meetupId) {
    // todo
  }

  //   function removeFavoriteHandler(meetupId) {
  //     setUserFavorites((prevUserFavorites) => {
  //       return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
  //     });
  //   }

  //   function itemIsFavoriteHandler(meetupId) {
  //     return userFavorites.some((meetup) => meetup.id === meetupId);
  //   }

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
