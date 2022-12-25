<?php

namespace App\Http\Controllers;

use App\Http\Services\MatchTicketsService;

use App\Http\Requests\MatchTicketsBuyRequest;
use App\Http\Requests\MatchTicketsCancelRequest;

use App\Http\Resources\MatchTicketsResource;
use App\Http\Resources\MatchTicketsCollection;

class MatchTicketsController extends Controller
{

  /** 
   * each customer (role = 2) can show all their tickets
   *
   * @return Json
   */
  public function showAllTickets()
  {
    $matchTicketService = new MatchTicketsService();
    $tickets = $matchTicketService->showAllTickets();
    if (!$tickets) {
      return $this->errorResponse('forbidden', 403);
    }
    $tickets = $tickets->paginate(10);
    return $this->generalResponse(new MatchTicketsCollection($tickets), "ok", 200);
  }

  /**
   * only customers (role = 2) can buy tickets
   *
   * @param MatchTicketsBuyRequest $request
   * @return Json
   */
  public function buyTicket(MatchTicketsBuyRequest $request)
  {
    $request->validated();
    $matchTicketService = new MatchTicketsService();
    $user_id = $request->user()->id;

    $matchTicket = $matchTicketService->buyTicket(
      $user_id,
      $request->match_id,
      $request->row_number,
      $request->seat_number
    );
    if (!$matchTicket) {
      return $this->errorResponse('forbidden', 403);
    }
    $matchTicketResource = new MatchTicketsResource($matchTicket);
    return $this->generalResponse($matchTicketResource, "ok", 200);
  }

  /**
   * only customers (role = 2) can cancel tickets
   *
   * @param MatchTicketsCancelRequest $request
   * @return Json
   */
  public function cancelTicket(MatchTicketsCancelRequest $request)
  {
    $request->validated();
    $matchTicketService = new MatchTicketsService();
    $isDeleted = $matchTicketService->cancelTicket($request->ticket_id);
    if (!$isDeleted) {
      return $this->errorResponse('forbidden', 403);
    }
    return $this->generalResponse('', "ok", 200);
  }
}
