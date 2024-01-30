import React, { useState } from "react";
import classes from "./RecipeCard.module.css";
import chipClasses from "../pages/AllRecipes.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from '@mui/material/Chip';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function RecipeCard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = React.useState(id === props.recipe._id ? true : false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOpenDialog = () => {
    setOpen(true);
    // navigate(`/recipe/${props.recipe._id}`);
    console.log("location.pathname: ", location.pathname);
    navigate(`${location.pathname === '/' ? '' : location.pathname}/${props.recipe._id}`);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    navigate(`/all-recipes`);
  };

  return (
    <div className={classes.card}>
      <div className={classes.image}>
        {props.recipe.image ? (
          <img src={props.recipe.image} alt={props.recipe.title} />
        ) : (
          <img
            className={classes["image-default"]}
            src={require("../data/chef.png")}
            alt={props.recipe.title}
          />
        )}
      </div>

      <div className={classes["recipe-title"]}>{props.recipe.title}</div>
      <div className={classes.actions}>
        <div className={classes["expand-wrapper"]}>
          <Button variant="text" onClick={handleOpenDialog}>
            Show Recipe
          </Button>
          <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
        {isExpanded && (
          <div className={classes.expanded}>
            {" "}
            {props.recipe.ingredients && (
              <ul>
                {props.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
            {props.recipe.instructions && (
              <div>{props.recipe.instructions}</div>
            )}
            <div className={chipClasses["tag-chips"]}>
              {props.recipe.tags.map((tag) => (
                <Chip
                key={tag}
                label={tag}
                color="default"
              >
              </Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{props.recipe.title}</DialogTitle>
        <DialogContent>
          {props.recipe.ingredients && (
            <ul>
              {props.recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          )}
          {props.recipe.instructions && (
            <span>{props.recipe.instructions}</span>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RecipeCard;
