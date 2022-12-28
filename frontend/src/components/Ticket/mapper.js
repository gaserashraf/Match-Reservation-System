export const ticketMapper = (ticket) => {
  let ticketRet = {
    match_id: ticket.matchId,
    row_number: ticket.seat[0],
    seat_number: ticket.seat[1],
  };
  return ticketRet;
};
export const ticketMapperTo = (ticket) => {
  let ticketRet = {
    ticketId: ticket.id,
    matchId: ticket.match_id,
    rowSeat: ticket.row_number,
    seatNumber: ticket.seat_number,
  };
  return ticketRet;
};
