<?php

namespace App\Http\Services;

use App\Models\MatchTickets;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MatchTicketsService
{
  
  /**
   * each customer (role = 2) can show all their tickets
   *
   * @return Collection
   */
  public function showAllTickets()
  {
    $tickets = Auth::user()->tickets();
    return $tickets;
  }

  /**
   * only customers (role = 2) can buy tickets
   *
   * @param int $user_id
   * @param int $match_id
   * @param int $row_number
   * @param int $seat_number
   *
   * @return ?MatchTickets
   */
  public function buyTicket(int $user_id, int $match_id, int $row_number, int $seat_number): ?MatchTickets
  {
    try {
      DB::beginTransaction();
      $match_ticket = MatchTickets::create([
        'user_id' => $user_id,
        'match_id' => $match_id,
        'row_number' => $row_number,
        'seat_number' => $seat_number,
      ]);
      DB::commit();
      return $match_ticket;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
  }

  /**
   * only customers (role = 2) can cancel tickets
   *
   * @param int $ticket_id
   * @return bool
   */
  public function cancelTicket(int $ticket_id): bool
  {
    try {
      DB::beginTransaction();
      $match_ticket = Auth::user()->tickets()->where('id', $ticket_id)->first();
      if(!$match_ticket) {
        return false;
      }
      // the customer can cancel the ticket only 3 days before the match date
      $canCancel = $match_ticket->fbmatch->date->subDays(3)->isPast();
      if($canCancel) {
        $match_ticket->delete();
      } else {
        return false;
      }
      DB::commit();
      return true;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return false;
    }
  }
}
