const url = "https://api.bytesiterecipe.com/api/RecipeDataTrigger";
// const url = "http://localhost:7071/api/RecipeDataTrigger"

export const getRecipes = async () => {
  console.log("getting recipes");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const results = await response.json();
  for (let i = 0; i < results.length; i++) {
    if (results[i].tags) {
      results[i].tags = JSON.parse(results[i].tags);
    }
    if (results[i].ingredients) {
      results[i].ingredients = JSON.parse(results[i].ingredients);
    }
  }
  return results;
};

export const addRecipe = async (recipeData, password) => {
  console.log("Adding recipe: ", recipeData);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/ejson",
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
    response.ok ? "success adding recipe" : `failed to add recipe - ${await response.text()}`
  );

  return response;
};

export const removeRecipe = async (recipeId, password) => {

  console.log("removing recipe: ", recipeId);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      password: password,
    },
    body: JSON.stringify({
      _id: recipeId,
    }),
  });

  console.log(
    response.ok
      ? `success removing recipe - count: ${await response
          .text()
          .then((data) => data.deletedCount)}`
      : `failed to remove recipe - ${await response.text()}`
  );

  return response;
};


export const editRecipe = async (recipeId, updatedRecipeData, password) => {
    console.log("editing recipe: ", updatedRecipeData.title);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/ejson",
        Accept: "application/json",
        email: "huntermm18@gmail.com",
        password: password,
      },
      body: JSON.stringify({
        _id: recipeId,
        title: updatedRecipeData.title,
        tags: updatedRecipeData.tags,
        ingredients: updatedRecipeData.ingredients,
        instructions: updatedRecipeData.instructions,
        picture: updatedRecipeData.picture,
      }),
    });

    console.log(await response.text());
    console.log(
      response.ok
        ? "success editing recipe"
        : `failed to edit recipe - ${response}`
    );

    return response;
}

