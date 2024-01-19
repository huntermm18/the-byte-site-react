const base = "https://corsproxy.io/?https://us-west-2.aws.data.mongodb-api.com";
// const ENV = "dev";
// const base =
//   ENV === "dev"
//     ? "http://localhost:3001"
//     : "https://us-west-2.aws.data.mongodb-api.com";

export const getRecipes = async () => {
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

  const results = await response.json();
  // console.log(result.documents);
  return results.documents;
};

export const addRecipe = async (recipeData, password) => {
  const url = `${base}/app/data-wasdn/endpoint/data/v1/action/insertOne`;
  console.log("Adding recipe: ", recipeData);

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
    response.ok ? "success adding recipe" : `failed to add recipe - ${response}`
  );

  return response;
};

export const removeRecipe = async (recipeId, password) => {
  const url = `${base}/app/data-wasdn/endpoint/data/v1/action/deleteOne`;

  console.log("removing recipe: ", recipeId);

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
      filter: { _id: { $oid: recipeId } },
    }),
  });

  console.log(
    response.ok
      ? `success removing recipe - count: ${await response
          .json()
          .then((data) => data.deletedCount)}`
      : `failed to remove recipe - ${response}`
  );

  return response;
};


export const editRecipe = async (recipeId, updatedRecipeData, password) => {
  const url = `${base}/app/data-wasdn/endpoint/data/v1/action/updateOne`;
    console.log("editing recipe: ", updatedRecipeData.title);

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
        filter: { _id: { $oid: recipeId } },
        update: { $set: updatedRecipeData },
      }),
    });

    console.log(await response.json());
    console.log(
      response.ok
        ? "success editing recipe"
        : `failed to edit recipe - ${response}`
    );

    return response;
}