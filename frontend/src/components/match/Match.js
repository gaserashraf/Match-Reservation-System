import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import flag from "./flag.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AlertContext } from "../../contexts/AlertContext";
const Match = () => {
  // purchase modal
  const alertContext = useContext(AlertContext);
  const [openPurchase, setOpenPurchase] = React.useState(false);
  const handleOpen = () => setOpenPurchase(true);
  const handleClose = () => setOpenPurchase(false);
  const PurchaseModal = {
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
  const [cardNumber, setCardNumber] = useState();
  const [cardPin, setCardPin] = useState();

  const { id } = useParams();

  const [match, setMatch] = useState({});
  let matchTmp = {
    id: id,
    team1: "Qatar",
    team2: "Ecuador",
    stadium: "Stadium1",
    mainReferee: "Mohamed",
    lineReferee1: "Ahmed",
    lineReferee2: "Ali",
    dateAndTime: "2022-08-18T21:11:54",
  };

  matchTmp.dateAndTime = new Date(matchTmp.dateAndTime);

  let current_date =
    matchTmp.dateAndTime.getFullYear() +
    "-" +
    (matchTmp.dateAndTime.getMonth() + 1) +
    "-" +
    matchTmp.dateAndTime.getDate();
  let current_time =
    matchTmp.dateAndTime.getHours() + ":" + matchTmp.dateAndTime.getMinutes();

    
  useEffect(() => {
    // To be replaced with API call

    setMatch(matchTmp);
  }, []);

  // stadium details
  let rows = 5;
  let numberOfSeats = 20;
  // zero based
  const reservedSeatsArr = [
    [0, 1],
    [2, 3],
    [3, 0],
  ];

  const [seats, setSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  //setReservedSeats(reservedSeatsArr);
  useEffect(() => {
    // TODO: get reserved seats from API
    setReservedSeats(reservedSeatsArr);
  }, []);

  // TODO: sent to API
  const handlePurchase = () => {
    //check if he enter string
    if (isNaN(cardNumber) || isNaN(cardPin)) {
      alertContext.setAlert("Card number and pin must be numbers", "error");
      return;
    }
    if (cardNumber.length !== 16) {
      alertContext.setAlert("Card number must be 16 digits", "error");
      return;
    }
    if (cardPin.length !== 4) {
      alertContext.setAlert("Card pin must be 4 digits", "error");
      return;
    }

    handleClose();
    // if reserved successfully
    alertContext.setAlert("Purchase successful", "success");
    setReservedSeats([...reservedSeats, ...seats]);
    setSeats([]);
    setCardNumber("");
    setCardPin("");
    
  };
  const handleSeatClick = (i, j) => {

    //check if it is reserved
    for (let z = 0; z < reservedSeats.length; z++) {
      if (reservedSeats[z][0] === i && reservedSeats[z][1] === j) {
        alertContext.setAlert("This seat is reserved", "error");
        return;
      }
    }
    //check if it is already selected
    for (let z = 0; z < seats.length; z++) {
      if (seats[z][0] === i && seats[z][1] === j) {
        alertContext.setAlert("This seat is already selected", "error");
        return;
      }
    }


    setSeats([...seats, [i, j]]);
  };
  const cancelSeat = (i, j) => {
    setSeats(seats.filter((seat) => seat[0] !== i || seat[1] !== j));
  };
  const getSeatColor = (row, seat) => {
    for (let i = 0; i < reservedSeats.length; i++) {
      if (reservedSeats[i][0] === row && reservedSeats[i][1] === seat) {
        return "red";
      }
    }
    for (let i = 0; i < seats.length; i++) {
      if (seats[i][0] === row && seats[i][1] === seat) {
        return "green";
      }
    }
    return "gray";
  };
  const getSeat = (row, seat) => {
    return (
      <div className="d-flex flex-column align-items-center">
        {row === 0 && <div>{seat}</div>}
        <i
          className="fas fa-couch mr-2 mb-2"
          style={{
            fontSize: "25px",
            color: getSeatColor(row, seat),
            cursor: "pointer",
          }}
          onClick={handleSeatClick.bind(this, row, seat)}
        ></i>
      </div>
    );
  };
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
          <div className="row justify-content-center align-items-start mb-3">
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

      <div className="row justify-content-center  mt-5">
        <div className="col-md-9 col-12">
          {[...Array(rows)].map((x, i) => {
            return (
              <div className="row justify-content-center">
                <div
                  className={`mr-1 ${
                    i === 0 ? "d-flex align-items-center" : ""
                  }`}
                >
                  {i}
                </div>
                {[...Array(numberOfSeats)].map((y, j) => {
                  return getSeat(i, j);
                })}
              </div>
            );
          })}
        </div>
        <div className="col-md-3 col-12">
          <div className="row justify-content-between w-100 align-items-center m-0">
            <p className="mb-0 display-4" style={{ fontSize: "28px" }}>
              Tickets:
            </p>
            <button
              className="btn btn-success"
              disabled={seats.length === 0 ? true : false}
              onClick={handleOpen}
            >
              Purchase
            </button>
            <Modal
              open={openPurchase}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={PurchaseModal}>
                <h1 className="text-center mb-2">
                  You have purchased {seats.length} tickets
                </h1>
                <div className="row justify-content-center mb-2">
                  <div className="col-md-12">
                    <TextField
                      required
                      id="filled-required"
                      label="Card number"
                      variant="filled"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="row justify-content-center mb-2">
                  <div className="col-md-12">
                    <TextField
                      required
                      id="filled-required"
                      label="PIN"
                      variant="filled"
                      value={cardPin}
                      onChange={(e) => setCardPin(e.target.value)}
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
                      onClick={handlePurchase}
                    >
                      Purchase
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>

          <div className="d-flex flex-wrap mt-2">
            {seats.map((seat) => {
              return (
                <div
                  className="d-flex align-items-center mr-3 mb-3 flex-column justify-content-center"
                  style={{
                    background: "#F0F0F0",
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
                  }}
                >
                  <div className="d-flex justify-content-end w-100 pr-2">
                    <i
                      className="fas fa-times"
                      style={{
                        color: "red",
                        fontSize: "1.5vw",
                        cursor: "pointer",
                      }}
                      onClick={cancelSeat.bind(this, seat[0], seat[1])}
                    ></i>
                  </div>
                  <i
                    className="fas fa-ticket-alt mb-2"
                    style={{
                      fontSize: "28px",
                      color: "green",
                    }}
                  ></i>
                  <p className="mb-0" style={{ fontSize: "15px" }}>
                    <i className="fas fa-couch mr-2"></i>
                    {seat[0]}-{seat[1]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
