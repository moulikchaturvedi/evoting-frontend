import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1 className="my-5" style={{ textAlign: "center" }}>
        Dashboard
      </h1>
      <h5 style={{ textAlign: "center" }}>
        <Link to={"/voting"}>Cast your vote here!</Link>
      </h5>
    </>
  );
}

export default Dashboard;
