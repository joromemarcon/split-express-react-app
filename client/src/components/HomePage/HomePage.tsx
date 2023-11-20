import React from "react";
import Header from "../Navigation/NavigationBar";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  let navigate = useNavigate();
  const routeToPayeePage = () => {
    navigate("/receipts");
  };
  const routeToPayorPage = () => {
    navigate("/receipts");
  };

  return (
    <div>
      <Header></Header>
      <main>
        <div className="mn-bg-img">
          <div className="mg">
            <div className="mg-logo-container">
              <div id="mg-logo"></div>
            </div>
            <div className="mg-flex">
              <div className="mg-flex-child" onClick={routeToPayorPage}>
                View your bill
              </div>
              <div className="mg-flex-child" onClick={routeToPayeePage}>
                Pay a friend
              </div>
              <div className="mg-flex-child" onClick={routeToPayeePage}>
                Create new bill
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
