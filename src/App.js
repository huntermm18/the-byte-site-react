import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipes";
import HomeSearchPage from "./pages/HomeSearch";
import AddRecipePage from "./pages/AddRecipe";
import EditRecipePage from "./pages/EditRecipe";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeSearchPage />} />
        <Route path="/all-recipes" element={<AllRecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/edit-recipe" element={<EditRecipePage />} />
      </Routes>
    </Layout>
  );
}

export default App;