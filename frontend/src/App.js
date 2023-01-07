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
import RequireAuth from "./routing/ProtectedRoutes";
import Stadiums from "./components/stadium/Stadiums";
import Matches from "./components/match/Matches";
import Match from "./components/match/Match";
import Tickets from "./components/Ticket/Tickets";
import Teams from "./components/teams/Teams";
import Referees from "./components/referees/Referees";
import "./index.css";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <UserContextProvider>
          <AlertContextProvider>
            <Router>
              <Navbar />
              {/* <CustomAlert /> */}
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route element={<RequireAuth />}>
                    <Route path="/administrator" element={<MangerView />} />
                    <Route
                      path="administrator/newusers"
                      element={<NewUsers />}
                    />
                    <Route
                      path="administrator/currentusers"
                      element={<CurrentUsers />}
                    />
                  </Route>
                  <Route path="/referees" element={<Referees />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/stadiums" element={<Stadiums />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/matchs" element={<Matches />} />
                  <Route path="/matchs/:id" element={<Match />} />
                  <Route exact path="register" element={<Register />} />
                  <Route exact path="login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </AlertContextProvider>
        </UserContextProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
