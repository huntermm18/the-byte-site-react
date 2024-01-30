import React, { useState } from "react";
import tags from "../data/tags.json";
import classes from "./AllRecipes.module.css";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import RecipesContext from "../store/recipes-context";
import Chip from '@mui/material/Chip';


function RecipeDetailPage() {
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
          <Chip
            key={tag}
            label={tags[tag]}
            color={activeTags.includes(tag) ? "primary" : "default"}
            onClick={() => {
              if (activeTags.includes(tag)) {
                setActiveTags(activeTags.filter((t) => t !== tag));
              } else {
                setActiveTags([...activeTags, tag]);
              }
            }}
          >
          </Chip>
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

export default RecipeDetailPage;
