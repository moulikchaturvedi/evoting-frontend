import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Voting from "./components/Voting";
import PrivateRoutesLayout from "./layouts/PrivateRoutesLayout";
import RegisterRoutesLayout from "./layouts/RegisterRoutesLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<App />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutesLayout />}>
          <Route exact path="/register" element={<Register />} />
          <Route element={<RegisterRoutesLayout />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/voting" element={<Voting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
