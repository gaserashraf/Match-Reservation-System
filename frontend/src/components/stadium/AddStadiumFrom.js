import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { handleAddStadium } from "./Service";
import { AlertContext } from "../../contexts/AlertContext";
const AddStadiumFrom = (props) => {
  const alertContext = useContext(AlertContext);
  const [name, setName] = React.useState("");
  const [rows, setRows] = React.useState("");
  const [seatsPerRow, setSeatsPerRow] = React.useState("");

  const onSubmit = () => {
    if (name === "" || rows === "" || seatsPerRow === "") {
      alertContext.setAlert("Please fill all fields", "error");
      return;
    }

    const stadium = {
      name,
      rows,
      seatsPerRow,
    };
  
    if (handleAddStadium(stadium)) {
      alertContext.setAlert("Stadium added successfully", "success");
      props.setStadiums([...props.stadiums, stadium]);
    } else {
      alertContext.setAlert("Stadium added failed", "error");
    }
    props.onClose();
  };
  return (
    <div>
      <div>
        <h1 className="text-center mb-2">Add Stadium</h1>
        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
            <TextField
              required
              id="filled-required"
              label="Stadium Name"
              variant="filled"
              className="mr-3 "
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
            <TextField
              required
              id="filled-required"
              label="Number of Rows"
              variant="filled"
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-md-12">
            <TextField
              required
              id="filled-required"
              label="Number of Seats Per Row"
              variant="filled"
              className="mr-3"
              type="number"
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(e.target.value)}
              sx={{ width: "100%" }}
            />
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
              Add Stadium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStadiumFrom;
