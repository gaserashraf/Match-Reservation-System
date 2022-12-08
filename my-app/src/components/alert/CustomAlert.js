import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";

const CustomAlert = ({ open, setOpen, msg }) => {
  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <i class="fas fa-times"></i>
          </IconButton>
        }
        sx={{ width:"100%"}}
      >
        Error - {" "} 
        {msg}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
