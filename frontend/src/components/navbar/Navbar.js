import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditProfile from "../auth/EditProfile";
import logo from "./logo.png";
const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);

  const toogleMobileIcon = () => setMobileView(!mobileView);
  const logout = () => {
    localStorage.removeItem("user");
    setMobileView(false);
    window.location.href = "/";
  };

  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  const handleOpen = () => setOpenEditProfile(true);
  const handleClose = () => setOpenEditProfile(false);

  const gusetLinks = (
    <>
      <li className="nav-item">
        <Link
          className="nav-links"
          to="/register"
          onClick={() => setMobileView(false)}
        >
          Regsiter
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-links"
          to="/login"
          onClick={() => setMobileView(false)}
        >
          Login
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className="nav-item">
        <span className="nav-links" onClick={() => setMobileView(false)}>
          <button className="btn btn-dark" onClick={handleOpen}>
            Edit Profile
          </button>
        </span>
      </li>
      <li className="nav-item">
        <span className="nav-links" onClick={() => setMobileView(false)}>
          <button className="btn btn-outline-dark" onClick={logout}>
            Logout
          </button>
        </span>
      </li>
    </>
  );

  const EditProfileStyleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  let Auth = !localStorage.getItem("user");
  return (
    <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
      <Modal
        open={openEditProfile}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={EditProfileStyleModal}>
          <EditProfile onClose={handleClose} />
        </Box>
      </Modal>
      <h1>
        <Link to="/">
          {/* <i className="fas fa-trophy mr-1"></i> */}
          <div className="d-flex">
            <div className="logo" style={{ width: "50px", height: "50px" }}>
              <img src={logo} alt="logo" className="logo w-100" />
            </div>
            <p className="headingNav mb-0">FIFA world cup</p>
          </div>
        </Link>
      </h1>

      <div className="justify-content-end">
        <button className="navbar-toggler" onClick={toogleMobileIcon}>
          <i
            className={`text-dark ${
              mobileView ? "fas fa-times" : "fas fa-bars"
            }`}
          />
        </button>
        <ul className={(mobileView ? "nav-menu active" : "nav-menu") + " mb-0"}>
          {Auth ? authLinks : gusetLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
