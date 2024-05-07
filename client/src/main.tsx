import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./components/HomePage/HomePage.tsx";
import Payor from "./components/Payor/Payor.tsx";
import Payee from "./components/Payee/Payee.tsx";
import PayorMainPage from "./components/Payor/PayorMainPage.tsx";
import PayeeMainPage from "./components/Payee/PayeeMainPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/payhost",
    element: <Payor />,
  },
  {
    path: "/payhost/:phoneNumber",
    element: <PayorMainPage />,
    // element: <PayorItemize />,
  },
  {
    path: "/host",
    element: <Payee />,
  },
  {
    path: "/host/:phoneNumber/:lastName",
    element: <PayeeMainPage />,
    //element: <PayeeItemize />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
