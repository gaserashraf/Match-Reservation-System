export const ticketMapperFrom = (ticket) => {
    let ticketRet={
        matchId: ticket.match_id,
        rowSeat: ticket.row_seat,
        seatNumber: ticket.seat_number,
    }
    return ticketRet;
}