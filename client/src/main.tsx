import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Itemize from "./components/Itemize.tsx";

const router = createBrowserRouter([
  {
    path: "/receipts",
    element: <App />,
  },
  {
    path: "/receipts/:phoneNumber",
    element: <Itemize />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
