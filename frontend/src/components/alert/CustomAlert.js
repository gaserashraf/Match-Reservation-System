import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import { AlertContext } from "../../contexts/AlertContext";
import Snackbar from "@mui/material/Snackbar";

const CustomAlert = () => {
  const alertContext = useContext(AlertContext);
  const vertical = "top";
  const horizontal = "right";
  return (
    alertContext?.alerts?.length > 0 &&
    alertContext?.alerts?.map((alert) => (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={alert?.id}
        open={true}
        style={{
          opacity: .95,
        }}
      >
        <Alert
          key={alert?.id}
          severity={alert?.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                alertContext.removeAlert(alert?.id);
              }}
            >
              <i className="fas fa-times"></i>
            </IconButton>
          }
          sx={{ width: "100%" }}
        >
          {alert?.msg}
        </Alert>
      </Snackbar>
    ))
  );
};

export default CustomAlert;
