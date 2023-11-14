import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Itemize from "./components/Itemize.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import Payee from "./components/Payee.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/receipts",
    element: <Payee />,
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
