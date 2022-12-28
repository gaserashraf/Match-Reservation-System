import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import flag from "./flag.png";
import { Link } from "react-router-dom";
import moment from "moment";
const MatchCard = ({
  matchId,
  teamAName,
  teamBName,
  stadiumName,
  refereeName,
  dateAndTime,
  handleDelete,
  handleEdit,
}) => {
  dateAndTime = new Date(dateAndTime);

  const current_date = dateAndTime.toISOString().split("T")[0];

  const current_time = moment(dateAndTime).format("HH:mm");

  let user = JSON.parse(localStorage.getItem("user"));

  const [imageTeamA, setImageTeamA] = useState(null);
  const [imageTeamB, setImageTeamB] = useState(null);

  useEffect(() => {
    const fetchImage = async (name, setImage) => {
      try {
        const response = await import(
          `../../assets/flags/${name.replace(/ /g, "-").toLowerCase()}.png`
        );
        setImage(response.default);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage(teamAName, setImageTeamA);
    fetchImage(teamBName, setImageTeamB);
  }, []);

  return (
    <Card sx={{ width: 345 }}>
      <CardContent
        className="py-3"
        style={{ backgroundColor: "#fff", position: "relative" }}
      >
        {user?.role === "Manager" && (
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
        )}
        <Link to={`/matchs/${matchId}`}>
          <button className="btn btn-outline-dark">View Match</button>
        </Link>
        <CardContent className="pb-0">
          <div className="row">
            <div className="col-4">
              <div>
                <img
                  src={imageTeamA ? imageTeamA : flag}
                  alt="flag"
                  className="w-100"
                />
              </div>
              <h5 style={{ fontSize: "15px" }}>{teamAName}</h5>
            </div>
            <div className="col-4">
              <h5 style={{ fontSize: "28px" }}>
                {current_time}
                <h6 style={{ fontSize: "12px" }}>{current_date}</h6>
              </h5>
            </div>
            <div className="col-4">
              <div>
                <img
                  src={imageTeamB ? imageTeamB : flag}
                  alt="flag"
                  className="w-100"
                />
              </div>
              <h5 style={{ fontSize: "15px" }}>{teamBName}</h5>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <i className="fas fa-ticket-alt mr-2"></i>
            {stadiumName}
          </div>
          <div className="row justify-content-center align-items-center">
            <i className="fas fa-flag mr-2"></i>
            {refereeName}
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
