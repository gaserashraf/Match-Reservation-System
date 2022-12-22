import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import flag from "./flag.png";
const Match = () => {
  const { id } = useParams();
  // To be replaced with API call
  let match = {
    id: id,
    team1: "Qatar",
    team2: "Ecuador",
    stadium: "Stadium1",
    mainReferee: "Mohamed",
    lineReferee1: "Ahmed",
    lineReferee2: "Ali",
    dateAndTime: "2022-08-18T21:11:54",
  };
  match.dateAndTime = new Date(match.dateAndTime);
  var current_date =
    match.dateAndTime.getFullYear() +
    "-" +
    (match.dateAndTime.getMonth() + 1) +
    "-" +
    match.dateAndTime.getDate();
  var current_time =
    match.dateAndTime.getHours() + ":" + match.dateAndTime.getMinutes();
  return (
    <div className="py-3">
      <div className="row align-items-center">
        <div className="col-4">
          <Typography variant="h5" component="div">
            <div>
              <img src={flag} alt="flag" className="w-100" />
            </div>
            {match.team1}
          </Typography>
        </div>
        <div className="col-4">
          <div  className="row justify-content-center align-items-start mb-3">
            <Typography variant="h3" component="div">
              {current_time}
              <Typography
                variant="h6"
                component="div"
                style={{ fontSize: "20px" }}
              >
                {current_date}
              </Typography>
            </Typography>
          </div>
          <div
            className="row justify-content-center align-items-center"
            style={{ fontSize: "25px" }}
          >
            <i className="fas fa-ticket-alt mr-2"></i>
            {match.stadium}
          </div>
          <div
            className="row justify-content-center align-items-center"
            style={{ fontSize: "25px" }}
          >
            <i className="fas fa-flag mr-2"></i>
            {match.mainReferee}
          </div>
          <div
            className="row justify-content-center align-items-center"
            style={{ fontSize: "25px" }}
          >
            <i className="far fa-flag mr-2"></i>
            {match.lineReferee1} <i className="ml-3 far fa-flag mr-2"></i>
            {match.lineReferee2}
          </div>
        </div>
        <div className="col-4">
          <Typography variant="h5" component="div" style={{ fontSize: "20px" }}>
            <div>
              <img src={flag} alt="flag" className="w-100" />
            </div>
            {match.team2}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Match;
