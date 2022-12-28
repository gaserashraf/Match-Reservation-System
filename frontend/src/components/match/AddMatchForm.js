import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleAddMatch, handleEditMatch } from "./Service";
import { getAllReferees } from "../referees/Service";
import { getAllTeams } from "../teams/Service";
import { getAllStadiums } from "../stadium/Service";
import { AlertContext } from "../../contexts/AlertContext";

import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

const AddMatchFrom = (props) => {
  let { matchs, setMatchs, editMatch, onClose } = props;
  const alertContext = useContext(AlertContext);
  const [team1, setTeam1] = React.useState(editMatch?.team1 || "");
  const [team1Name, setTeam1Name] = React.useState(null);
  const [team2, setTeam2] = React.useState(editMatch?.team2 || "");
  const [stadium, setStadium] = React.useState(editMatch?.stadium || "");
  const [mainReferee, setMainReferee] = React.useState(
    editMatch?.mainReferee || ""
  );
  const [lineReferee1, setLineReferee1] = React.useState(
    editMatch?.lineReferee1 || ""
  );
  const [lineReferee2, setLineReferee2] = React.useState(
    editMatch?.lineReferee2 || ""
  );
  const [dateAndTime, setDateAndTime] = React.useState(
    editMatch?.dateAndTime || moment("2022-08-18T21:11:54")
  );
  // TO DO get the real stadiums
  // const stadiumsArr = ["Stadium1", "Stadium2", "Stadium3"];
  // const refereesArr = ["Mohamed", "Ahmed", "Ali"];
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [stadiumsLoading, setStadiumsLoading] = useState(false);
  const [referees, setReferees] = useState([]);
  const [refereesLoading, setRefereesLoading] = useState(false);
  useEffect(() => {
    getAllStadiums(setStadiums, setStadiumsLoading);
    getAllReferees(setReferees, setRefereesLoading);
    getAllTeams(setTeams, setTeamsLoading);
  }, []);
  // useEffect(() => {
  //   console.log("d5l");
  //   if (editMatch) {
  //     setTeam1Name(editMatch?.team1.teamName);
  //   }
  // }, [teams]);
  const onSubmit = () => {
    if (
      team1 === "" ||
      team2 === "" ||
      stadium === "" ||
      mainReferee === "" ||
      lineReferee1 === "" ||
      lineReferee2 === "" ||
      dateAndTime === ""
    ) {
      alertContext.setAlert("Please fill all fields", "error");
      return;
    }

    const match = {
      team1,
      team2,
      stadium,
      mainReferee,
      lineReferee1,
      lineReferee2,
      dateAndTime,
    };
    console.log(match);
    if (props.editMatch) {
      handleEditMatch(match, setMatchs, matchs, alertContext);
    } else {
      handleAddMatch(match, setMatchs, matchs, alertContext);
    }
    onClose();
  };
  console.log("team1", team1);
  return (
    <div>
      <h1 className="text-center mb-2">
        {props.editMatch ? "Edit Match" : "Add Match"}
      </h1>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Team1</InputLabel>

            <Select
              disabled={teamsLoading}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={team1?.teamName}
              label="Team1"
              onChange={(e) => setTeam1(e.target.value)}
            >
              {teamsLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}

              {teams
                .filter((team) => team?.teamId !== team2?.teamId)
                .map((team) => (
                  <MenuItem value={team}>{team?.teamName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Team2</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={team2?.teamName}
              label="Team2"
              onChange={(e) => setTeam2(e.target.value)}
            >
              {teamsLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
              {teams
                .filter((team) => team?.teamId !== team1?.teamId)
                .map((team) => (
                  <MenuItem value={team}>{team?.teamName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Stadium</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stadium?.name}
              label="Team2"
              onChange={(e) => setStadium(e.target.value)}
            >
              {stadiumsLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
              {stadiums.map((stadium) => (
                <MenuItem value={stadium}>{stadium?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Main Referee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mainReferee?.refereeName}
              label="Main Referee"
              onChange={(e) => setMainReferee(e.target.value)}
            >
              {refereesLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
              {referees
                .filter(
                  (referee) =>
                    referee?.refereeId !== lineReferee1?.refereeId &&
                    referee?.refereeId !== lineReferee2?.refereeId
                )
                .map((referee) => (
                  <MenuItem value={referee}>{referee?.refereeName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Line Referee 1
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lineReferee1?.refereeName}
              label="Line Referee 1"
              onChange={(e) => setLineReferee1(e.target.value)}
            >
              {refereesLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
              {referees
                .filter(
                  (referee) =>
                    referee?.refereeId !== mainReferee?.refereeId &&
                    referee?.refereeId !== lineReferee2?.refereeId
                )
                .map((referee) => (
                  <MenuItem value={referee}>{referee?.refereeName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Line Referee 2
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lineReferee2?.refereeName}
              label="Line Referee 2"
              onChange={(e) => setLineReferee2(e.target.value)}
            >
              {refereesLoading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              )}
              {referees
                .filter(
                  (referee) =>
                    referee?.refereeId !== mainReferee?.refereeId &&
                    referee?.refereeId !== lineReferee1?.refereeId
                )
                .map((referee) => (
                  <MenuItem value={referee}>{referee?.refereeName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="Date & Time"
              value={dateAndTime}
              onChange={(e) => setDateAndTime(e)}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "100%" }} />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "100%" }}
            onClick={onSubmit}
          >
            {props.editMatch ? "Edit Match" : "Add Match"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMatchFrom;
