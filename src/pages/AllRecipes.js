import React, { useState } from "react";
import tags from "../data/tags.json";
// import { get_recipes } from "../data/recipe_data";
import classes from "./AllRecipes.module.css";
import RecipeCard from "../components/RecipeCard";

import { useContext } from "react";
import RecipesContext from "../store/recipes-context";

function AllRecipesPage() {
  const recipesCtx = useContext(RecipesContext);
  const [activeTags, setActiveTags] = useState([]);

  const filteredRecipes = recipesCtx.recipes.filter((recipe) => {
    if (activeTags.length === 0) {
      return true;
    } else {
      return activeTags.every((tag) => {
        return recipe.tags.includes(tags[tag]);
      });
    }
  });

  return (
    <div>
      <div className={classes["tag-chips"]} >
        {Object.keys(tags).map((tag) => (
          <div
            key={tag}
            className={`${classes.chip} ${
              activeTags.includes(tag) ? classes["chip-active"] : ""
            }`}
            onClick={() => {
              if (activeTags.includes(tag)) {
                setActiveTags(activeTags.filter((t) => t !== tag));
              } else {
                setActiveTags([...activeTags, tag]);
              }
            }}
          >
            {tags[tag]}
          </div>
        ))}
      </div>

      <div className={classes["recipe-display"]}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default AllRecipesPage;
