import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import { Drawer, Nav } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import SearchIcon from "@rsuite/icons/Search";

function Layout(props) {
  const navigate = useNavigate();
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
    <div>
      <AppBar position="relative" style={{ height: "70px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            The Byte Site
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              navigate("/");
            }}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        placement="left"
        size="sm"
      >
        <Drawer.Header>
          <Drawer.Title>The Byte Site</Drawer.Title>
          {/* <Drawer.Actions>
            <Button onClick={toggleDrawer}>Cancel</Button>
            <Button onClick={toggleDrawer} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions> */}
        </Drawer.Header>
        <Drawer.Body style={{ padding: "10px" }}>
          <Nav style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, index) => (
              <Nav.Item
                key={index}
                component={Link}
                to={item.to}
                as={NavLink}
                icon={item.icon}
                style={{ padding: "25px 30px" }}
                onClick={toggleDrawer}
              >
                {item.title}
              </Nav.Item>
            ))}
          </Nav>
        </Drawer.Body>
      </Drawer>

      <main
        style={{ margin: "30px", display: "flex", justifyContent: "center" }}
      >
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
