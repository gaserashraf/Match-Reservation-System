import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleAddMatch, handleEditMatch } from "./Service";
import { AlertContext } from "../../contexts/AlertContext";
import { teams } from "./teams.js";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

const AddMatchFrom = (props) => {
  const alertContext = useContext(AlertContext);
  const [team1, setTeam1] = React.useState(props.editMatch?.team1 || "");
  const [team2, setTeam2] = React.useState(props.editMatch?.team2 || "");
  const [stadium, setStadium] = React.useState(props.editMatch?.stadium || "");
  const [mainReferee, setMainReferee] = React.useState(
    props.editMatch?.mainReferee || ""
  );
  const [lineReferee1, setLineReferee1] = React.useState(
    props.editMatch?.lineReferee1 || ""
  );
  const [lineReferee2, setLineReferee2] = React.useState(
    props.editMatch?.lineReferee2 || ""
  );
  const [dateAndTime, setDateAndTime] = React.useState(
    props.editMatch?.dateAndTime || moment("2022-08-18T21:11:54")
  );
  // TO DO get the real stadiums
  const stadiums = ["Stadium1", "Stadium2", "Stadium3"];
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
    if (props.editMatch) {
      if (handleEditMatch(match)) {
        alertContext.setAlert("Match edited successfully", "success");
        props.setMatchs(
          props.matchs.map((m) => (m._id === match._id ? match : m))
        );
      } else {
        alertContext.setAlert("Match edited failed", "error");
      }
    } else {
      if (handleAddMatch(match)) {
        alertContext.setAlert("Match added successfully", "success");
        props.setMatchs([...props.matchs, match]);
      } else {
        alertContext.setAlert("Match added failed", "error");
      }
    }
    props.onClose();
  };
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={team1}
              label="Team1"
              onChange={(e) => setTeam1(e.target.value)}
            >
              {teams.map((team) => (
                <MenuItem value={team}>{team}</MenuItem>
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
              value={team2}
              label="Team2"
              onChange={(e) => setTeam2(e.target.value)}
            >
              {teams
                .filter((team) => team !== team1)
                .map((team) => (
                  <MenuItem value={team}>{team}</MenuItem>
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
              value={stadium}
              label="Team2"
              onChange={(e) => setStadium(e.target.value)}
            >
              {stadiums.map((stadium) => (
                <MenuItem value={stadium}>{stadium}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <TextField
            required
            id="filled-required"
            label="Main Referee"
            variant="filled"
            value={mainReferee}
            onChange={(e) => setMainReferee(e.target.value)}
            sx={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <TextField
            required
            id="filled-required"
            label="Line Referee 1"
            variant="filled"
            className="mr-3"
            value={lineReferee1}
            onChange={(e) => setLineReferee1(e.target.value)}
            sx={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="row justify-content-center mb-2">
        <div className="col-md-12">
          <TextField
            required
            id="filled-required"
            label="Line Referee 2"
            variant="filled"
            className="mr-3"
            value={lineReferee2}
            onChange={(e) => setLineReferee2(e.target.value)}
            sx={{ width: "100%" }}
          />
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
