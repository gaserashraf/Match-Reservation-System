import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./routing/PrivateRoute";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/notFound/NotFound";
import NewUsers from "./components/administrator/NewUsers";
import CurrentUsers from "./components/administrator/CurrentUsers";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <div className="container">
          <Routes>
            {/* <PrivateRoute exact path="/" element={Home} /> */}
            <Route path="administrator" element={<Home />} />
            <Route path="administrator/newusers" element={<NewUsers />} />
            <Route path="administrator/currentusers" element={<CurrentUsers />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
