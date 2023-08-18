import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/styles.scss";
import { ListsProvider } from "./context/lists_context";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ListsProvider>
      <App />
    </ListsProvider>
  </React.StrictMode>
);
