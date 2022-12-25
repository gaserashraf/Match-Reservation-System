import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const UserCard = ({
  name,
  username,
  email,
  gender,
  role,
  birthday,
  type,
  handleOk,
  handleNo,
}) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardContent
        className="py-2"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {type === "current" ? ( // if type is new show the buttons}
          <IconButton
            onClick={handleNo}
            aria-label="settings"
            style={{ position: "absolute", right: "0", top: "0" }}
          >
            <i
              className="fas fa-trash-alt"
              style={{ color: "red", fontSize: 20 }}
            ></i>{" "}
          </IconButton>
        ) : (
          <>
            <IconButton
              onClick={handleNo}
              aria-label="settings"
              style={{ position: "absolute", right: "0", top: "0" }}
            >
              <i
                className="fas fa-trash-alt"
                style={{ color: "red", fontSize: 20 }}
              ></i>{" "}
            </IconButton>
            <IconButton
              onClick={handleOk}
              aria-label="settings"
              style={{ position: "absolute", right: "25px", top: "0" }}
            >
              <i
                className="fas fa-check"
                style={{ color: "green", fontSize: 20 }}
              ></i>{" "}
            </IconButton>
          </>
        )}

        <i className="fas fa-user" style={{ fontSize: 50 }}></i>
        <CardContent className="pb-0">
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography color="text.secondary">{"@" + username}</Typography>
          <Typography variant="h6" component="div">
            <i className="fas fa-envelope mr-1"></i>
            {email}
          </Typography>
          <div className="row mt-2">
            <div className="col-4">
              <Typography variant="h6" component="div" sx={{ fontSize: 14 }}>
                <i className="fas fa-venus-mars mr-1"></i>
                {gender}
              </Typography>
            </div>
            <div className="col-4">
              <Typography variant="h6" component="div" sx={{ fontSize: 14 }}>
                {role}
              </Typography>
            </div>
            <div className="col-4">
              <Typography variant="h6" component="div" sx={{ fontSize: 14 }}>
                <i className="fas fa-table mr-1"></i>
                {birthday}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default UserCard;
