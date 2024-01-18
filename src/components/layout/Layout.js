import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";

function Layout(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const items = [
    {
      icon: <HomeIcon />,
      title: "Home",
      to: "/",
    },
    {
      icon: <ArticleIcon />,
      title: "Recipe Page",
      to: "/all-recipes",
    },
    {
      icon: <AddIcon />,
      title: "Add a Recipe",
      to: "/add-recipe",
    },
    {
      icon: <EditIcon />,
      title: "Edit or Delete a Recipe",
      to: "/edit-recipe",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <AppBar position="fixed" style={{ height: "70px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">The Byte Site</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} component={Link} to={item.to}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        style={{ marginTop: "64px", display: "flex", justifyContent: "center" }}
      >
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
