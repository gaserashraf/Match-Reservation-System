<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
  use HasFactory;

  protected $table = 'stadiums';

  protected $fillable = [
    'stadium_name',
    'number_of_rows',
    'number_of_seats_per_row',
  ];

  public function matches()
  {
    return $this->hasMany(FootballMatch::class, 'stadium_id');
  }

  public function getCapacityAttribute()
  {
    return $this->number_of_rows * $this->number_of_seats_per_row;
  }

  // get reserved seats for a match
  // $match_id: int
  // return: array ['row_number' => [seat_number, seat_number, ...], ...]
  public function getReservedSeats(int $match_id): ?array
  {
    $reserved_seats = [];
    // check if match is in this stadium
    $match = $this->matches()->where('id', $match_id)->first();
    if(!$match) {
      return null;
    }
    $tickets = $match->tickets()->get();
    foreach ($tickets as $ticket) {
      $reserved_seats[$ticket->row_number][] = $ticket->seat_number;
    }
    $result = [
      'match_id' => $match_id,
      'number_of_rows' => $this->number_of_rows,
      'number_of_seats_per_row' => $this->number_of_seats_per_row,
      'total_capacity' => $this->getCapacityAttribute(),
      'number_of_reserved_seats' => count($tickets),
      'reserved_seats' => $reserved_seats,
    ];
    return $result;
  }
}
