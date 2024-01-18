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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AddRecipePage(props) {
  const recipesCtx = useContext(RecipesContext);
  const titleInputRef = useRef();
  const instructionsInputRef = useRef();
  const addRecipePasswordInputRef = useRef();

  const [ingredients, setIngredients] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [addStatus, setAddStatus] = React.useState(false);

  function submitHandler(event) {
    event.preventDefault();

    const newRecipeData = {
      title: titleInputRef.current.value,
      picture: null,
      ingredients: ingredients,
      instructions: instructionsInputRef.current.value,
      tags: selectedTags,
    };

    recipesCtx
      .addRecipe(
        newRecipeData,
        addRecipePasswordInputRef.current.value.toLowerCase()
      )
      .then((status) => {
        setAddStatus(status);
        setOpenSnackBar(true);
        if (status === 201) {
          titleInputRef.current.value = "";
          instructionsInputRef.current.value = "";
          setIngredients([""]);
          setSelectedTags([]);
        }
      });
  }

  const addIngredientHandler = () => {
    setIngredients((prevIngredients) => [...prevIngredients, ""]);
  };

  const removeIngredientHandler = (index) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  return (
    <Box maxWidth="1000px" margin="auto">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        autoHideDuration={7000}
        onClose={() => setOpenSnackBar(false)}
        severity={addStatus === 201 ? "success" : ""}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={addStatus === 201 ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {addStatus === 201
            ? "Recipe added successfully!"
            : addStatus === 401
            ? "Incorrect password"
            : "Error adding recipe"}
        </Alert>
      </Snackbar>

      <h1>Add a Recipe</h1>
      <Card>
        <CardContent>
          
          {/* Form submission handler */}
          <form onSubmit={submitHandler}>
            {/* Form control for the recipe password */}
            <FormControl margin="normal" fullWidth>
              <TextField
                id="addPassword"
                label="Add Recipe Password"
                inputRef={addRecipePasswordInputRef}
                required
              />
            </FormControl>
            {/* Form control for the recipe title */}
            <FormControl margin="normal" fullWidth>
              <TextField
                id="title"
                label="Title"
                inputRef={titleInputRef}
                required
              />
            </FormControl>
            {/* Map through the ingredients and create a form control for each one */}
            {ingredients.map((ingredient, index) => (
              <FormControl key={index} margin="normal" fullWidth>
                <Box display="flex" alignItems="center">
                  {/* Button to remove the ingredient */}
                  <IconButton
                    onClick={() => removeIngredientHandler(index)}
                    edge="start"
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Input field for the ingredient */}
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
            {/* Button to add a new ingredient */}
            <Button onClick={addIngredientHandler}>Add Ingredient</Button>
            {/* Form control for the recipe directions */}
            <FormControl margin="normal" fullWidth>
              <TextField
                id="description"
                label="Directions"
                multiline
                rows={5}
                inputRef={instructionsInputRef}
              />
            </FormControl>
            {/* Autocomplete input for the recipe tags */}
            <FormControl margin="normal" fullWidth>
              <Autocomplete
                multiple
                id="tags"
                options={tags}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  setSelectedTags(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            </FormControl>
            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Add Recipe
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddRecipePage;
