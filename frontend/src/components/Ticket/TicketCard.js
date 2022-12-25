import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";

const TicketCard = ({ id, matchId, rowSeat, seatNumber, handleDelete }) => {
  return (
    <Card
      sx={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 5px",
        margin: "10px",
      }}
    >
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
        </>
        <CardContent className="pb-0">
          <div
            className="d-flex align-items-center mr-3 mb-3 flex-column justify-content-center"
            style={{}}
          >
            Match with id:
            {matchId}
            <i
              className="fas fa-ticket-alt mb-2"
              style={{
                fontSize: "28px",
                color: "green",
              }}
            ></i>
            <p className="mb-0" style={{ fontSize: "15px" }}>
              <i className="fas fa-couch mr-2"></i>
              {rowSeat}-{seatNumber}
            </p>
          </div>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
