import React, { useEffect, useState, useContext } from "react";
import TicketCard from "./TicketCard";
import { AlertContext } from "../../contexts/AlertContext";
import { deleteTicket, getAllTickets } from "./Service.js";
import CustomLoading from "../loading/CustomLoading";
const Tickets = () => {
  const alertContext = useContext(AlertContext);
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  let userToken = JSON.parse(localStorage.getItem("user"))?.access_token;

  // TODO: get tickets from backend
  useEffect(() => {
    if (!userToken) {
      alertContext.setAlert("Please login first", "error");
      setTicketsLoading(false);
      return;
    }
    getAllTickets(setTickets, setTicketsLoading);
  }, []);

  const handleDelete = (id) => {
    deleteTicket(id, setTickets, tickets, alertContext);
  };
  return (
    <div>
      <h1 className="mb-5 text-left">My Tickets</h1>
      <div className="row mt-2">
        {ticketsLoading && <CustomLoading />}
        {tickets.length === 0 && ticketsLoading === false && userToken && (
          <h3>You have no tickets</h3>
        )}
        {!userToken && <h3>Please login first</h3>}
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            matchId={ticket.matchId}
            rowSeat={ticket.rowSeat}
            seatNumber={ticket.seatNumber}
            handleDelete={handleDelete.bind(this, ticket.ticketId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
