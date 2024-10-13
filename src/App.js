import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipes";
import HomeSearchPage from "./pages/HomeSearch";
import AddRecipePage from "./pages/AddRecipe";
import EditRecipePage from "./pages/EditRecipe";

// DELETEME
import {HuntPage, AaaPage, XyzPage, AnniePage} from "./hunt/hunt";
import {  useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()
  const p = location.pathname
  if (p.includes("hunt") || p.includes("aaa") || p.includes("xyz") || p.includes("annie")) {
    return (
      <Routes>
        <Route path="/hunt" element={<HuntPage />} />
        <Route path="/aaa" element={<AaaPage />} />
        <Route path="/xyz" element={<XyzPage />} />
        <Route path="/annie" element={<AnniePage />} />
      </Routes>
    );
  }
  return (
    <Layout>
      <Routes>
        <Route path="/:id" element={<HomeSearchPage />} />
        <Route path="/" element={<HomeSearchPage />} />
        <Route path="/all-recipes/:id" element={<AllRecipesPage />} />
        <Route path="/all-recipes" element={<AllRecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/edit-recipe" element={<EditRecipePage />} />
      </Routes>
    </Layout>
  );
}

export default App;