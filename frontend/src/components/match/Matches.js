import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddMatchFrom from "./AddMatchForm";
import MatchCard from "./MatchCard";
const Matches = () => {
  const AddMatchModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [openAddStadium, setOpenAddStadium] = React.useState(false);
  const handleOpen = () => setOpenAddStadium(true);
  const handleClose = () => setOpenAddStadium(false);

  let matchsArr = [
    {
      team1: "Qatar",
      team2: "Ecuador",
      stadium: "Al Bayt Stadium",
      mainReferee: "Mohamed",
      linesman1: "Ahmed",
      linesman2: "Ali",
      dateAndTime: "2022-08-18T21:11:54",
    },
    {
      team1: "Qatar",
      team2: "Ecuador",
      stadium: "Al Bayt Stadium",
      mainReferee: "Mohamed",
      linesman1: "Ahmed",
      linesman2: "Ali",
      dateAndTime: "2022-08-18T21:11:54",
    },
    {
      team1: "Qatar",
      team2: "Ecuador",
      stadium: "Al Bayt Stadium",
      mainReferee: "Mohamed",
      linesman1: "Ahmed",
      linesman2: "Ali",
      dateAndTime: "2022-08-18T21:11:54",
    },
  ];
  const [matchs, setMatchs] = useState(matchsArr);
  const handleDelete = (match) => {
    console.log(match);
    setMatchs(matchs.filter((m) => m !== match));
  };

  const handleEdit = (match) => {
    console.log(match);
  };
  return (
    <div>
      <h1 className="mb-5 text-left">Matches</h1>
      <div className="row justify-content-center mb-2">
        <div className="col-md-12 d-flex flex-wrap justify-content-between">
          <button className="btn btn-dark" onClick={handleOpen}>
            Add Match
          </button>
          <Modal
            open={openAddStadium}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={AddMatchModal}>
              <AddMatchFrom
                onClose={handleClose}
                setMatchs={setMatchs}
                matchs={matchs}
              />
            </Box>
          </Modal>
        </div>
      </div>
      <div className="row mt-2">
        {matchs.map((match) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mb-2">
              <MatchCard
                team1={match.team1}
                team2={match.team2}
                stadium={match.stadium}
                mainReferee={match.mainReferee}
                dateAndTime={match.dateAndTime}
                handleDelete={handleDelete.bind(this, match)}
                handleEdit={handleEdit.bind(this, match)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
