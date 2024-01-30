import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import RecipesContext from "../store/recipes-context";
import SearchBar from "../components/SearchBar";
import { useParams } from 'react-router-dom';

const HomeSearchPage = () => {
  const { id } = useParams();
  const recipesCtx = useContext(RecipesContext);
  const [searchTerm, setSearchTerm] = useState("");

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
        {id && recipesCtx.recipes.length !== 0 && (
          <RecipeCard
            key={id}
            recipe={recipesCtx.recipes.find((recipe) => recipe._id === id)}
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
