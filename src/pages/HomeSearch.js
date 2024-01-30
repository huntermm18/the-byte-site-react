import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import RecipesContext from "../store/recipes-context";
import SearchBar from "../components/SearchBar";
import { useParams, useNavigate } from 'react-router-dom';

const HomeSearchPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const recipesCtx = useContext(RecipesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // If there is an id in the URL, set the recipe to the recipe with that id
    if (id) {
      const recipeFromId = recipesCtx.recipes.find((recipe) => recipe._id === id);
      setRecipe(recipesCtx.recipes.find((recipe) => recipe._id === id));
      if (!recipeFromId && recipesCtx.recipes.length > 0) {
        console.log("Recipe not found");
        navigate(`/`); // go back to home page if recipe not found
      }
    }
  }, [recipesCtx.recipes, id, navigate]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div>
        <SearchBar
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Show recipe if it is part of the URL */}
        {recipe && (
          <RecipeCard
            key={id}
            recipe={recipe}
          />
        )} 

        {/* Show all recipes that match the search term */}
        {recipesCtx.recipes.map((recipe, index) => {
          if (
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            searchTerm !== ""
          ) {
            return <RecipeCard key={index} recipe={recipe} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default HomeSearchPage;
