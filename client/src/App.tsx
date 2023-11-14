import { useState } from "react";
import "./App.css";
import NavigationBar from "./components/Navigation/NavigationBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <div className="App">
        <NavigationBar />
        <HomePage />
      </div>
    </>
  );
}

export default App;
