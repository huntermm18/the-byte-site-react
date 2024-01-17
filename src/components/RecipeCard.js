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
import DialogContentText from "@mui/material/DialogContentText";
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
              <div>
                {props.recipe.instructions}
              </div>
            )}
            <div className={chipClasses["tag-chips"]}>
              {props.recipe.tags.map((tag) => (
                <div
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
          <DialogContentText>
            {props.recipe.ingredients && (
              <ul>
                {props.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
            {props.recipe.instructions && (
              <div>
                {props.recipe.instructions}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RecipeCard;

// return (
//   <div className={classes["recipe-card"]}>
//     <img
//       src={
//         props.recipe.image ||
//         "https://media.istockphoto.com/id/1304722048/vector/chef-line-icon.jpg?s=612x612&w=0&k=20&c=YJ6EQULaJDhf5sdIn8SEUDd09aJtB_RnP24kmoKY290="
//       }
//       alt={props.recipe.title}
//       className={classes["recipe-image"]}
//     />
//     <div className={classes["card-content"]}>
//       <div className={classes["title-expand-container"]}>
//         <h2 className={classes["recipe-title"]}>{props.recipe.title}</h2>
//         <IconButton onClick={toggleExpand} >
//           {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//         </IconButton>
//       </div>
//       <p className={classes["recipe-description"]}>
//         {props.recipe.description}
//       </p>
//       {isExpanded && (
//         <>
//           {props.recipe.ingredients && (
//             <ul className={classes["recipe-ingredients"]}>
//               {props.recipe.ingredients.map((ingredient, index) => (
//                 <li key={index}>{ingredient}</li>
//               ))}
//             </ul>
//           )}
//           <p className={classes["recipe-instructions"]}>
//             {props.recipe.instructions}
//           </p>
//         </>
//       )}
//     </div>
//   </div>
// );
