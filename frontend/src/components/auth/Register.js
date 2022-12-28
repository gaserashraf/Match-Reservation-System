import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { handleRegister } from "./Service";
import { Link } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";
import moment from "moment";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");

  const [date, setDate] = React.useState(moment("2022-03-25"));
  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  const [gender, setGender] = React.useState("");
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [role, setRole] = React.useState("");
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      date === "" ||
      gender === "" ||
      role === "" ||
      country === ""
    ) {
      alertContext.setAlert("Please fill all the fields", "error");
      return;
    }
    // check if password is strong enough
    if (password.length < 8) {
      alertContext.setAlert("Password must be at least 8 characters", "error");
      return;
    }
    // check if password have one Uppercase, one lowercase and one number
    if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g)
    ) {
      alertContext.setAlert(
        "Password must contain at least one Uppercase, one lowercase and one number",
        "error"
      );
      return;
    }
    // check if email is valid
    if (!email.includes("@")) {
      alertContext.setAlert("Please enter a valid email", "error");
      return;
    }

    let user = {
      firstName,
      lastName,
      email,
      username,
      password,
      country,
      date,
      gender,
      role,
    };
    handleRegister(user, alertContext);
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setCountry("");
    setDate("");
    setGender("");
    setRole("");
  };

  return (
    <div>
      <div>
        <h1 className="text-center mb-2">Register</h1>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              required
              id="filled-required"
              label="First Name"
              variant="filled"
              className="mr-3 "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              required
              id="filled-required"
              label="Last Name"
              variant="filled"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              required
              id="filled-email-required"
              label="Email"
              variant="filled"
              className="mr-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              required
              id="filled-username-required"
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              required
              id="filled-password-input"
              label="Password"
              type="password"
              variant="filled"
              className="mr-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
              label="Nationality"
              variant="filled"
              sx={{ width: "100%" }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6 d-flex justify-content-between">
            <div className="col-md-4 p-0">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Birth Date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-md-4 p-0 pl-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Age"
                  onChange={handleChangeGender}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4 p-0 pl-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChangeRole}
                >
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Fan"}>Fan</MenuItem>
                </Select>
              </FormControl>
            </div>{" "}
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <Button
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
