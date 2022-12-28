import Axios from "axios";
import apiBaseUrl from "../../config.json";
import { ticketMapperTo, ticketMapper } from "./mapper";
export const deleteTicket = (ticketId, setTickets, tickets, alertContext) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  console.log(ticketId);
  return Axios({
    method: "DELETE",
    url: `${apiBaseUrl.apiBaseUrl}/ticket/cancel/${ticketId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      console.log(res);
      const msg= res?.data?.meta?.msg;
      if(msg==="ticket can't be deleted because the event is starting in 3 days"){
        alertContext.setAlert("Ticket can't be cancelled because the event is starting in 3 days", "error");
        return;
      }
      alertContext.setAlert("Ticket cancelled successfully", "success");
      setTickets(tickets.filter((ticket) => ticket.ticketId !== ticketId));
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Ticket cancelled failed", "error");
    });
};

export const buyTicket = (
  ticket,
  setReservedSeats,
  reservedSeats,
  setSeats,
  setCardNumber,
  setCardPin,
  alertContext
) => {
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  let ticketObj = ticketMapper(ticket);
  console.log(ticketObj);
  return Axios({
    method: "POST",
    url: `${apiBaseUrl.apiBaseUrl}/ticket/buy`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    data: ticketObj,
  })
    .then((res) => {
      console.log(res);
      //let ticket = res?.data?.response;
      alertContext.setAlert("Purchase successful", "success");
      setReservedSeats([...reservedSeats, ticket.seat]);
      setSeats([]);
      setCardNumber("");
      setCardPin("");
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      alertContext.setAlert("Purchase faild", "error");
    });
};

export const getAllTickets = (setTickets, setTicketsLoading) => {
  setTicketsLoading(true);
  let userToken = JSON.parse(localStorage.getItem("user")).access_token;
  Axios({
    method: "GET",
    url: `${apiBaseUrl.apiBaseUrl}/ticket/mytickets`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      console.log(res);
      let tickets = res?.data?.response?.tickets;
      let ticketsRet = [];
      tickets.forEach((ticket) => {
        ticketsRet.push(ticketMapperTo(ticket));
      });
      setTickets(ticketsRet);
      setTicketsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      let res = err?.response?.data?.message;
      console.log(res);
      setTicketsLoading(false);
    });
};
