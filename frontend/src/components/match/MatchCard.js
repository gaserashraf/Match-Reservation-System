import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import flag from "./flag.png";
import { Link } from "react-router-dom";
const MatchCard = ({
  id,
  team1,
  team2,
  stadium,
  mainReferee,
  dateAndTime,
  handleDelete,
  handleEdit,
}) => {
  dateAndTime = new Date(dateAndTime);
  var current_date =
    dateAndTime.getFullYear() +
    "-" +
    (dateAndTime.getMonth() + 1) +
    "-" +
    dateAndTime.getDate();
  var current_time = dateAndTime.getHours() + ":" + dateAndTime.getMinutes();
  return (
    <Card sx={{ width: 345 }}>
      <CardContent
        className="py-3"
        style={{ backgroundColor: "#f0f0f0", position: "relative" }}
      >
        <>
          <IconButton
            onClick={handleDelete}
            aria-label="settings"
            style={{ position: "absolute", right: "0", top: "0", zIndex: 99 }}
          >
            <i
              className="fas fa-trash-alt"
              style={{ color: "red", fontSize: 20 }}
            ></i>
          </IconButton>
          <IconButton
            onClick={handleEdit}
            aria-label="settings"
            style={{
              position: "absolute",
              right: "25px",
              top: "0",
              zIndex: 99,
            }}
          >
            <i
              className="fas fa-edit"
              style={{ color: "green", fontSize: 20 }}
            ></i>
          </IconButton>
        </>
        <Link to={`/matchs/${id}`}>
          <button className="btn btn-outline-dark">View Match</button>
        </Link>
        <CardContent className="pb-0">
          <div className="row">
            <div className="col-4">
              <Typography
                variant="h5"
                component="div"
                style={{ fontSize: "20px" }}
              >
                <div>
                  <img src={flag} alt="flag" className="w-100" />
                </div>
                {team1}
              </Typography>
            </div>
            <div className="col-4">
              <Typography variant="h5" component="div">
                {current_time}
                <Typography
                  variant="h6"
                  component="div"
                  style={{ fontSize: "12px" }}
                >
                  {current_date}
                </Typography>
              </Typography>
            </div>
            <div className="col-4">
              <Typography
                variant="h5"
                component="div"
                style={{ fontSize: "20px" }}
              >
                <div>
                  <img src={flag} alt="flag" className="w-100" />
                </div>
                {team2}
              </Typography>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <i className="fas fa-ticket-alt mr-2"></i>
            {stadium}
          </div>
          <div className="row justify-content-center align-items-center">
            <i className="fas fa-flag mr-2"></i>
            {mainReferee}
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
