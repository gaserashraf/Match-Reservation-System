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
import { handleUpdateProfile } from "./Service";
import { AlertContext } from "../../contexts/AlertContext";
import moment from "moment";

const EditProfile = (props) => {
  const alertContext = useContext(AlertContext);
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [email, setEmail] = React.useState(user.email);
  const [username, setUsername] = React.useState(user.username);
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState(user.country);

  const [date, setDate] = React.useState(moment(user.date));
  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  const [gender, setGender] = React.useState(user.gender);
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [role, setRole] = React.useState(user.role);
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const onSubmit = () => {
    const user = {
      firstName,
      lastName,
      email,
      username,
      password,
      country,
      date,
      gender,
    };
    handleUpdateProfile(user, alertContext);

    props.onClose();
  };
  return (
    <div>
      <div>
        <h1 className="text-center mb-2">Edit Profile</h1>
        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
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
          <div className="col-md-12">
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
          <div className="col-md-12">
            <TextField
              disabled
              required
              id="filled-required"
              label="Email"
              variant="filled"
              className="mr-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
            <TextField
              disabled
              required
              id="filled-required"
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
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
          <div className="col-md-12">
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
          <div className="col-md-12 d-flex justify-content-between">
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
                  disabled
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
          <div className="col-md-12">
            <Button
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              onClick={onSubmit}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
