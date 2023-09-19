import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Loader from "../components/Loader/Loader";
import Users from "../components/User";

const IRoutes = () => {
  const state = useSelector((state) => state.auth);

  return (
    <div className="App">
        {state?.showLoader && <Loader/>}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users"          element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
};

export default IRoutes;
