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

function RecipeCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
          <Button variant="text" onClick={() => setOpen(true)}>
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
                <div
                  key={tag}
                  className={chipClasses.chip}
                  style={{ pointerEvents: "none" }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RecipeCard;
