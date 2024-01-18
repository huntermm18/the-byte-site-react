import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import RecipesContext from "../store/recipes-context";
import SearchBar from "../components/SearchBar";

const HomeSearchPage = () => {
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
