import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleLogin } from "./Service";
import { Link } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";
const Login = () => {
  const alertContext = useContext(AlertContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    if (email === "" || password === "") {
      alertContext.setAlert(
        "Please fill all the fields",
        "fas fa-times",
        "error"
      );

      return;
    }
    handleLogin(email, password);
  };

  return (
    <div>
      <div>
        <h1 className="text-center mb-2">Login</h1>
        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            <TextField
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
            <Button
              variant="outlined"
              size="large"
              sx={{ width: "100%" }}
              onClick={onSubmit}
            >
              Login
            </Button>
          </div>
        </div>

        <div className="row justify-content-center mb-2">
          <div className="col-md-6">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
