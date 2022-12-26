import React, { useEffect, useState, useContext } from "react";
import TicketCard from "./TicketCard";
import { AlertContext } from "../../contexts/AlertContext";
import { deleteTicket } from "./Service.js";
const Tickets = () => {
  const alertContext = useContext(AlertContext);
  let ticketsArr = [
    {
      id: 1,
      matchId: 1,
      rowSeat: "0",
      seatNumber: "0",
    },
    {
      id: 2,
      matchId: 1,
      rowSeat: "0",
      seatNumber: "1",
    },
    {
      id: 3,
      matchId: 1,
      rowSeat: "0",
      seatNumber: "0",
    },
    {
      id: 4,
      matchId: 1,
      rowSeat: "0",
      seatNumber: "1",
    },
  ];
  const [tickets, setTickets] = useState([]);
  // TODO: get tickets from backend
  useEffect(() => {
    setTickets(ticketsArr);
  }, []);

  const handleDelete = (id) => {
    if (deleteTicket(id)) {
      alertContext.setAlert("Ticket canceled successfully!", "success");
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    } else {
      alertContext.setAlert("Error canceling ticket", "error");
    }
  };
  return (
    <div>
      <h1 className="mb-5 text-left">My Tickets</h1>
      <div className="row justify-content-center mb-2">
        <div className="col-md-12 d-flex flex-wrap justify-content-between"></div>
      </div>
      <div className="row mt-2">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            matchId={ticket.matchId}
            rowSeat={ticket.rowSeat}
            seatNumber={ticket.seatNumber}
            handleDelete={handleDelete.bind(this, ticket.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
