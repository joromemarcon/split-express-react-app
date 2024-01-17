import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PayorItemize from "./components/Payor/PayorItemize.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import Payor from "./components/Payor/Payor.tsx";
import Payee from "./components/Payee/Payee.tsx";
import PayeeItemize from "./components/Payee/PayeeItemize.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/payhost",
    element: <Payor />,
  },
  {
    path: "/payhost/:phoneNumber",
    element: <PayorItemize />,
  },
  {
    path: "/host",
    element: <Payee />,
  },
  {
    path: "/host/:phoneNumber/:lastName",
    element: <PayeeItemize />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
