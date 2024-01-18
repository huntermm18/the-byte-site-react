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
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function EditRecipePage(props) {
  const recipesCtx = useContext(RecipesContext);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const addRecipePasswordInputRef = useRef();

  const [ingredients, setIngredients] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openDialogCancel, setOpenDialogCancel] = React.useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [apiStatus, setApiStatus] = React.useState(false);

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
    setOpenDialogUpdate(true);
  }

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    const results = recipesCtx.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    searchValue !== "" ? setSearchResults(results) : setSearchResults([]);
  };

  const handleCancel = () => {
    setSelectedRecipe(null);
    setOpenDialogCancel(false);
    setSearchValue("");
  };

  const handleUpdate = () => {
    const updatedRecipeData = {
      title: titleInputRef.current.value,
      image: null,
      ingredients: ingredients,
      description: descriptionInputRef.current.value,
      tags: selectedTags,
    };
    recipesCtx
      .editRecipe(
        selectedRecipe._id,
        updatedRecipeData,
        addRecipePasswordInputRef.current.value.toLowerCase()
      )
      .then((status) => {
        setApiStatus(status);
        setOpenSnackBar(true);
      });
    setOpenDialogUpdate(false);
    setSelectedRecipe(null);
    setSearchValue("");
  };

  const handleDelete = () => {
    const password = addRecipePasswordInputRef.current.value.toLowerCase();
    if (!password) {
      alert("Please enter a password to delete the recipe.");
      setOpenDialogDelete(false);
      return;
    }
    recipesCtx
      .removeRecipe(selectedRecipe._id, password.toLowerCase())
      .then((status) => {
        setApiStatus(status);
        setOpenSnackBar(true);
      });
    setOpenDialogDelete(false);
    setSelectedRecipe(null);
    setSearchValue("");
  };

  return (
    <Box width="800px" margin="auto">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        autoHideDuration={7000}
        onClose={() => setOpenSnackBar(false)}
        severity={apiStatus === 200 ? "success" : ""}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={apiStatus === 200 ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {apiStatus === 200
            ? "Success!"
            : apiStatus === 401
            ? "Incorrect password"
            : "Error making update"}
        </Alert>
      </Snackbar>

      {/* Cancel Dialog */}
      <Dialog
        open={openDialogCancel}
        onClose={() => setOpenDialogCancel(false)}
      >
        <DialogTitle>Are you sure you want to cancel?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Yes
          </Button>
          <Button onClick={() => setOpenDialogCancel(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={openDialogUpdate}
        onClose={() => setOpenDialogUpdate(false)}
      >
        <DialogTitle>Are you sure you want to update this recipe?</DialogTitle>
        <DialogActions>
          <Button onClick={handleUpdate} variant="outlined" color="primary">
            Update
          </Button>
          <Button onClick={() => setOpenDialogUpdate(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(false)}
      >
        <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
          <Button onClick={() => setOpenDialogDelete(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <SearchBar onChange={handleSearchChange} value={searchValue}/>
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
                  onClick={() => setOpenDialogCancel(true)}
                >
                  Cancel
                </Button>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={() => setOpenDialogUpdate(true)}
                >
                  Update Recipe
                </Button>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={() => setOpenDialogDelete(true)}
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
