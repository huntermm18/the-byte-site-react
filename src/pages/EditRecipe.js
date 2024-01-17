import React, { useRef, useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  FormControl,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import tags from "../data/tags.json";
import { useContext } from "react";
import RecipesContext from "../store/recipes-context";
import SearchBar from "../components/SearchBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditRecipePage(props) {
  const recipesCtx = useContext(RecipesContext);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const addRecipePasswordInputRef = useRef();

  const [ingredients, setIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState({});

  const addIngredientHandler = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };

  const removeIngredientHandler = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  function submitHandler(event) {
    event.preventDefault();
  }

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    const results = recipesCtx.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    searchValue !== "" ? setSearchResults(results) : setSearchResults([]);
  };

  const handleCancel = () => {
    setDialogContent({ message: "Are you sure you want to cancel?"})
    setOpenDialog(true);
  }

  return (
    <Box width="800px" margin="auto">

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{dialogContent.message}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <SearchBar onChange={handleSearchChange} />
          {searchResults.map((result, index) => (
            <p
              key={index}
              onClick={() => {
                setSelectedRecipe(result);
                setSelectedTags(result.tags);
                setSearchResults([]);
                setIngredients(result.ingredients);
              }}
            >
              {result.title}
            </p>
          ))}
          {selectedRecipe && (
            <form onSubmit={submitHandler}>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="editPassword"
                  label="Password"
                  inputRef={addRecipePasswordInputRef}
                  required
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="title"
                  label="Title"
                  inputRef={titleInputRef}
                  required
                  value={selectedRecipe ? selectedRecipe.title : ""}
                />
              </FormControl>
              {ingredients &&
                ingredients.map((ingredient, index) => (
                  <FormControl key={index} margin="normal" fullWidth>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() => removeIngredientHandler(index)}
                        edge="start"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <TextField
                        value={ingredient}
                        onChange={(event) => {
                          const newIngredients = [...ingredients];
                          newIngredients[index] = event.target.value;
                          setIngredients(newIngredients);
                        }}
                        label={`Ingredient ${index + 1}`}
                      />
                    </Box>
                  </FormControl>
                ))}
              <Button onClick={addIngredientHandler}>Add Ingredient</Button>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="description"
                  label="Directions"
                  multiline
                  rows={5}
                  value={selectedRecipe.instructions}
                  inputRef={descriptionInputRef}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Autocomplete
                  multiple
                  id="tags"
                  options={tags}
                  value={selectedTags}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => {
                    setSelectedTags(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" />
                  )}
                />
              </FormControl>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={setOpenDialog(true)}
                >
                  Update Recipe
                </Button>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="error"
                  type="submit"
                >
                  Delete Recipe
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditRecipePage;
