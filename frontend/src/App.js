import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import AlertContextProvider from "./contexts/AlertContext";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/notFound/NotFound";
import NewUsers from "./components/administrator/NewUsers";
import CurrentUsers from "./components/administrator/CurrentUsers";
import MangerView from "./components/administrator/MangerView";
import RequireUnAuth from "./routing/UnProtectedRoutes";
import RequireAuth from "./routing/ProtectedRoutes";
import CustomAlert from "./components/alert/CustomAlert";
import Stadiums from "./components/stadium/Stadiums";
import Matches from "./components/match/Matches";
import Match from "./components/match/Match";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <AlertContextProvider>
          <Router>
            <Navbar />
            <CustomAlert />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<RequireAuth />}>
                  <Route path="/administrator" element={<MangerView />} />
                  <Route path="administrator/newusers" element={<NewUsers />} />
                  <Route
                    path="administrator/currentusers"
                    element={<CurrentUsers />}
                  />

                  <Route path="/stadiums" element={<Stadiums />} />
                  <Route path="/matchs" element={<Matches />} />
                  <Route path="/matchs/:id" element={<Match />} />
                </Route>
                <Route exact path="register" element={<Register />} />
                <Route exact path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </AlertContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
