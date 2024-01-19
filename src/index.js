// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { RecipesContextProvider } from "./store/recipes-context";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   // https://mui.com/material-ui/customization/typography/
//   typography: {
//     // Tell Material UI what the font-size on the html element is.
//     // htmlFontSize: 12,
//   },
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1c6f92',
//     },
//     secondary: {
//       main: '#1199a4',
//     },
//   },
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <RecipesContextProvider>
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <App />
//       </ThemeProvider>
//     </BrowserRouter>
//   </RecipesContextProvider>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecipesContextProvider } from "./store/recipes-context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecipesContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </RecipesContextProvider>
);
