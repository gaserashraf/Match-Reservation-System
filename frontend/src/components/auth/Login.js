import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleLogin } from "./Service";
import CustomAlert from "../alert/CustomAlert";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [openAlert, setOpenAlert] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const onSubmit = () => {
    if (email === "" || password === "") {
      setMsg("Please fill all the fields");
      setOpenAlert(true);
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
            <CustomAlert open={openAlert} setOpen={setOpenAlert} msg={msg} />
          </div>
        </div>
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
