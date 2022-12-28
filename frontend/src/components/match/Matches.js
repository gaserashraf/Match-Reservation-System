import React, { useState, useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddMatchFrom from "./AddMatchForm";
import MatchCard from "./MatchCard";
import { AlertContext } from "../../contexts/AlertContext";
import { getAllMatchs, handleDeleteMatch } from "./Service";
import CustomLoading from "../loading/CustomLoading";
const Matches = () => {
  const alertContext = useContext(AlertContext);

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
  const [editMatch, setEditMatch] = useState(null);

  const [openAddStadium, setOpenAddStadium] = React.useState(false);
  const handleOpen = () => setOpenAddStadium(true);
  const handleClose = () => {
    setOpenAddStadium(false);
    setEditMatch(null);
  };

  const [matchs, setMatchs] = useState([]);
  const [matchsLoading, setMatchsLoading] = useState(false);
  useEffect(() => {
    getAllMatchs(setMatchs, setMatchsLoading);
    console.log(matchs);
  }, []);

  const handleDelete = (match) => {
    //console.log(match);
    // setMatchs(matchs.filter((m) => m.matchId !== match.matchId));
    // alertContext.setAlert("Match Deleted Successfully", "success");
    handleDeleteMatch(match.matchId, setMatchs, matchs, alertContext);
  };

  const handleEdit = (match) => {
    //console.log(match);
    let matchObj = {
      matchId: match.matchId,
      team1: {
        teamId: match.teamAId,
        teamName: match.teamAName,
      },
      team2: {
        teamId: match.teamBId,
        teamName: match.teamBName,
      },
      stadium: {
        stadiumId: match.stadiumId,
        stadiumName: match.stadiumName,
      },
      mainReferee: {
        refereeId: match.refereeId,
        refereeName: match.refereeName,
      },
      lineReferee1: {
        refereeId: match.linesManAId,
        refereeName: match.linesManAName,
      },
      lineReferee2: {
        refereeId: match.linesManBId,
        refereeName: match.linesManBName,
      },
      matchDate: match.matchDate,
    };
    setEditMatch(matchObj);
    setOpenAddStadium(true);
  };
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="mb-5 text-left">Matches</h1>
      <div className="row justify-content-center mb-2">
        <div className="col-md-12 d-flex flex-wrap justify-content-between">
          {user?.role === "Manager" && (
            <button className="btn btn-dark" onClick={handleOpen}>
              Add Match
            </button>
          )}
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
                editMatch={editMatch}
              />
            </Box>
          </Modal>
        </div>
      </div>
      <div className="row mt-2">
        {matchsLoading && <CustomLoading />}
        {matchs.map((match) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mb-2 d-flex justify-content-center">
              <MatchCard
                matchs={matchs}
                setMatchs={setMatchs}
                key={match.matchId}
                matchId={match.matchId}
                teamAName={match.teamAName}
                teamBName={match.teamBName}
                stadiumName={match.stadiumName}
                refereeName={match.refereeName}
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
