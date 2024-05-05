import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MyTodoContextProvider } from "./context/TodoContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyTodoContextProvider>
      <App />
    </MyTodoContextProvider>
  </React.StrictMode>
);
