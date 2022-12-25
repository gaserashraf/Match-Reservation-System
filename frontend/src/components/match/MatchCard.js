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
  const current_date =
    dateAndTime.getFullYear() +
    "-" +
    (dateAndTime.getMonth() + 1) +
    "-" +
    dateAndTime.getDate();
  const current_time = dateAndTime.getHours() + ":" + dateAndTime.getMinutes();
  return (
    <Card sx={{ width: 345 }}>
      <CardContent
        className="py-3"
        style={{ backgroundColor: "#fff", position: "relative" }}
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
              <h5 style={{ fontSize: "20px" }}>
                <div>
                  <img src={flag} alt="flag" className="w-100" />
                </div>
                {team1}
              </h5>
            </div>
            <div className="col-4">
              <h5 style={{fontSize:"28px"}}>
                {current_time}
                <h6 style={{ fontSize: "12px" }}>{current_date}</h6>
              </h5>
            </div>
            <div className="col-4">
              <h5 style={{ fontSize: "22px" }}>
                <div>
                  <img src={flag} alt="flag" className="w-100" />
                </div>
                {team2}
              </h5>
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
